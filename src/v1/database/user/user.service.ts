import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { UserBackendDto } from './dto/user.backend.dto';
import { UserUpdate } from './dto/user.update.dto';
import { Bill } from '../bill/entities/bill.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectRepository(Role) private readonly roleService: Repository<Role>,
    @InjectRepository(Bill) private readonly billService: Repository<Bill>,
    private jwtService: JwtService
  ) { }

  async getUserIdFromCookies(cookies: Record<string, any>) {
    const token = cookies["access_token"]
    if (!token) {
      throw new UnauthorizedException({ message: "token not found !" })
    }
    const JWT_KEY = process.env.JWT_KEY;
    let payload: object;
    try {
      payload = await this.jwtService.verifyAsync(
        token.access_token,
        {
          secret: JWT_KEY
        }
      );
    } catch (err) {
      throw new UnauthorizedException({ message: "token expired" });
    }
    const id = payload["id"]
    return id
  }

  async getAllUser() {
    try {
      const allUser = await this.userService.findAndCount({
        relations: {
          role: true
        }
      })
      return allUser[0]
    } catch (err) {
      console.error("user.sevice.ts getAllUser: ", err.message)
      throw new InternalServerErrorException({ message: "Something went wrong! Please try again later." })
    }
  }

  async getAllBills(cookies: Record<string, any>) {
    const id = await this.getUserIdFromCookies(cookies)
    const allBills = await this.billService.find({
      where: {
        user: {
          id: id
        }
      }
    })
    return allBills
  }

  async getUserByCondition(condition: string, value: string) {
    if (!["userName", "email", "id"].includes(condition)) {
      throw new BadRequestException({ message: "condition should be userName, email or id" })
    }
    const users = await this.userService.find({
      where: {
        userName: condition == "userName" ? value : Like("%"),
        email: condition == "email" ? value : Like("%"),
        id: condition == "id" ? parseInt(value) : MoreThan(0)
      },
      relations: ["role"]
    })
    return users
  }

  async addNewUser(userData: UserBackendDto) {
    const roldId = userData.roleId;
    const role = await this.roleService.findOne({ where: { id: roldId } })

    const password = userData.password;
    if (password.length < 8) {
      throw new BadRequestException({ message: "Password must contains at least 8 characters." })
    }

    if (!role) {
      throw new BadRequestException({ mesage: "Role Id not exist in database." })
    }

    const userName = userData.userName;
    const user = await this.userService.findOne({ where: { userName: userName } })
    if (user) {
      throw new BadRequestException({ message: `userName=${userName} has already exist in database.` })
    }

    const email = userData.email;
    const emails = await this.userService.findOne({ where: { email: email } })
    if (emails) {
      throw new BadRequestException({ message: `email=${email} has already exist in database.` })
    }

    const salt = parseInt(process.env.SALT)
    const hashPassword = await bcrypt.hash(password, salt)

    delete userData["roleId"]
    userData.password = hashPassword
    const userBackendSave = {
      ...userData,
      role: role
    }
    return await this.userService.save(userBackendSave)
  }

  async updateUserById(userData: UserUpdate, cookies: Record<string, any>) {
    const id = await this.getUserIdFromCookies(cookies)
    const user = await this.userService.findOne({
      where: {
        id: id
      },
      relations: ["role"]
    })
    if (!user) {
      throw new NotFoundException({ message: "User not found in database." })
    }
    userData.id = user.id
    return await this.userService.update({ id: id }, userData)
  }

  async deleteUser(cookies: Record<string, any>, condition: string, value: string) {
    if (!["userName", "email", "id"].includes(condition)) {
      throw new BadRequestException({ message: "condition should be userName, email or id" })
    }

    // get access_token from cookies
    const token = cookies["access_token"]
    if (!token) {
      throw new UnauthorizedException({ message: "token not found" });
    }
    const JWT_KEY = process.env.JWT_KEY
    let payload: object;
    try {
      payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: JWT_KEY
        }
      );
    } catch (err) {
      throw new UnauthorizedException({ message: "token expired" });
    }
    const adminId = payload["id"]
    const admin = await this.userService.findOne(
      {
        where: { id: adminId },
        relations: ["role"]
      }
    )
    if (admin.role.id > 1) {
      throw new BadRequestException({ message: "not allowed to delete user" });
    }

    if (condition == "userName") {
      const user = await this.userService.findOne({
        where: { userName: value },
        relations: ["role"]
      })
      if (!user) {
        throw new BadRequestException({ message: "user not found" });
      }
      if (admin.role.id > 1) {
        throw new BadRequestException({ message: "not allowed to delete user" });
      }
      return await this.userService.remove(user)
    }

    if (condition == "email") {
      const user = await this.userService.findOne({
        where: { email: value },
        relations: ["role"]
      })
      if (!user) {
        throw new BadRequestException({ message: "user not found" });
      }
      if (admin.role.id > 1) {
        throw new BadRequestException({ message: "not allowed to delete user" });
      }
      return await this.userService.remove(user)
    }

    if (condition == "id") {
      const user = await this.userService.findOne({
        where: { id: parseInt(value) },
        relations: ["role"]
      })
      if (!user) {
        throw new BadRequestException({ message: "user not found" });
      }
      if (admin.role.id > 1) {
        throw new BadRequestException({ message: "not allowed to delete user" });
      }
      return await this.userService.remove(user)
    }
  }

  async payBill(billId: number) {
    return await this.billService.save({
      id: billId,
      paid: true
    })
  }

  async uploadUserAvatar(fileId: string, cookies: Record<string, any>) {
    try {
      // get access_token from cookies
      const token = cookies["access_token"]
      if (!token) {
        throw new UnauthorizedException({ message: "token not found" });
      }
      const JWT_KEY = process.env.JWT_KEY
      let payload: object;
      try {
        payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: JWT_KEY
          }
        );
      } catch (err) {
        throw new UnauthorizedException({ message: "token expired" });
      }
      const userId = payload["id"]
      const user = await this.userService.findOne(
        {
          where: { id: userId },
        }
      )
      if (!user) {
        throw new NotFoundException({ message: "User not found in database." })
      }
      user.avatar = fileId
      return await this.userService.update({ id: userId }, user)


    } catch (err) {
      console.error("user.sevice.ts uploadUserAvatar: ", err.message)
      throw new InternalServerErrorException({ message: "Something went wrong! Please try again later." })
    }
  }

  async getUserAvatarById(cookies: Record<string, any>) {
    try {
      // get access_token from cookies
      const userId = await this.getUserIdFromCookies(cookies);
      const user = await this.userService.findOne(
        {
          where: { id: userId },
        }
      )
      if (!user) {
        throw new NotFoundException({ message: "User not found in database." })
      }

      if (user.avatar == null) {
        if (user.gender == 1) {
          return "male.png"
        } else {
          return "female.png"
        }
      }

      return user.avatar
    } catch (err) {
      console.error("user.sevice.ts getUserAvatarById: ", err.message)
      throw new InternalServerErrorException({ message: "Something went wrong! Please try again later." })
    }
  }
}