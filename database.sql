--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE backend;




--
-- Drop roles
--

DROP ROLE root;


--
-- Roles
--

CREATE ROLE root;
ALTER ROLE root WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:eri3WmpdGi+y4dIOcbXcmw==$91MQ7QO07dcptZ6ZJcHQooAXsTW3vrL9nT8M+R75cmg=:UAcjboww4CNt+t5RukViM9sCrDo2PyUJSIduZibSgMo=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Debian 15.6-1.pgdg120+2)
-- Dumped by pg_dump version 15.6 (Debian 15.6-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO root;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: root
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: root
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: root
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "backend" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Debian 15.6-1.pgdg120+2)
-- Dumped by pg_dump version 15.6 (Debian 15.6-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: backend; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE backend WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE backend OWNER TO root;

\connect backend

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bill; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.bill (
    id integer NOT NULL,
    "priceAll" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public.bill OWNER TO root;

--
-- Name: bill_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.bill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bill_id_seq OWNER TO root;

--
-- Name: bill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.bill_id_seq OWNED BY public.bill.id;


--
-- Name: manage; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.manage (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "userId" integer NOT NULL,
    "managerId" integer NOT NULL
);


ALTER TABLE public.manage OWNER TO root;

--
-- Name: manage_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.manage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.manage_id_seq OWNER TO root;

--
-- Name: manage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.manage_id_seq OWNED BY public.manage.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.role OWNER TO root;

--
-- Name: room; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.room (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "roomTypeId" integer
);


ALTER TABLE public.room OWNER TO root;

--
-- Name: room_detail; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.room_detail (
    id integer NOT NULL,
    number_users integer NOT NULL,
    check_in timestamp without time zone NOT NULL,
    check_out timestamp without time zone NOT NULL,
    discount integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "userId" integer,
    "roomId" integer,
    "billId" integer
);


ALTER TABLE public.room_detail OWNER TO root;

--
-- Name: room_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.room_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_detail_id_seq OWNER TO root;

--
-- Name: room_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.room_detail_id_seq OWNED BY public.room_detail.id;


--
-- Name: room_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_id_seq OWNER TO root;

--
-- Name: room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.room_id_seq OWNED BY public.room.id;


--
-- Name: room_service; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.room_service (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "typeId" integer NOT NULL,
    "serviceId" integer NOT NULL
);


ALTER TABLE public.room_service OWNER TO root;

--
-- Name: room_service_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.room_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_service_id_seq OWNER TO root;

--
-- Name: room_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.room_service_id_seq OWNED BY public.room_service.id;


--
-- Name: room_type; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.room_type (
    id integer NOT NULL,
    name character varying NOT NULL,
    capacity integer NOT NULL,
    "priceBase" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.room_type OWNER TO root;

--
-- Name: room_type_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.room_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_type_id_seq OWNER TO root;

--
-- Name: room_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.room_type_id_seq OWNED BY public.room_type.id;


--
-- Name: service; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.service (
    id integer NOT NULL,
    name character varying NOT NULL,
    price integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.service OWNER TO root;

--
-- Name: service_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.service_id_seq OWNER TO root;

--
-- Name: service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.service_id_seq OWNED BY public.service.id;


--
-- Name: services_used; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.services_used (
    "servicesUsed" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "roomDetailId" integer,
    "serviceId" integer
);


ALTER TABLE public.services_used OWNER TO root;

--
-- Name: services_used_servicesUsed_seq; Type: SEQUENCE; Schema: public; Owner: root
--

ALTER TABLE public.services_used ALTER COLUMN "servicesUsed" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."services_used_servicesUsed_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    "userName" character varying NOT NULL,
    password character varying NOT NULL,
    phone character varying NOT NULL,
    gender integer NOT NULL,
    email character varying NOT NULL,
    "fullName" character varying NOT NULL,
    salary integer NOT NULL,
    city character varying NOT NULL,
    country character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "roleId" integer NOT NULL
);


ALTER TABLE public."user" OWNER TO root;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO root;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: bill id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.bill ALTER COLUMN id SET DEFAULT nextval('public.bill_id_seq'::regclass);


--
-- Name: manage id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.manage ALTER COLUMN id SET DEFAULT nextval('public.manage_id_seq'::regclass);


--
-- Name: room id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room ALTER COLUMN id SET DEFAULT nextval('public.room_id_seq'::regclass);


--
-- Name: room_detail id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_detail ALTER COLUMN id SET DEFAULT nextval('public.room_detail_id_seq'::regclass);


--
-- Name: room_service id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_service ALTER COLUMN id SET DEFAULT nextval('public.room_service_id_seq'::regclass);


--
-- Name: room_type id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_type ALTER COLUMN id SET DEFAULT nextval('public.room_type_id_seq'::regclass);


--
-- Name: service id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.service ALTER COLUMN id SET DEFAULT nextval('public.service_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: bill; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.bill (id, "priceAll", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: manage; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.manage (id, "createdAt", "updatedAt", "userId", "managerId") FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.role (id, name, "createdAt", "updatedAt") FROM stdin;
1	admin	2024-04-19 05:08:29+00	2024-04-19 05:08:29+00
2	manager	2024-04-19 05:08:41+00	2024-04-19 05:08:41+00
3	employee	2024-04-19 05:08:53+00	2024-04-19 05:08:53+00
4	user	2024-04-19 05:09:00+00	2024-04-19 05:09:00+00
\.


--
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.room (id, "createdAt", "updatedAt", "roomTypeId") FROM stdin;
\.


--
-- Data for Name: room_detail; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.room_detail (id, number_users, check_in, check_out, discount, "createdAt", "updatedAt", "userId", "roomId", "billId") FROM stdin;
\.


--
-- Data for Name: room_service; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.room_service (id, "createdAt", "updatedAt", "typeId", "serviceId") FROM stdin;
\.


--
-- Data for Name: room_type; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.room_type (id, name, capacity, "priceBase", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.service (id, name, price, "createdAt", "updatedAt") FROM stdin;
1	air condition	1212	2024-04-19 15:21:10.479625+00	2024-04-19 15:21:10.479625+00
2	bath	12	2024-04-19 15:32:05.483356+00	2024-04-19 15:32:05.483356+00
3	tivi	120	2024-04-19 15:32:13.715992+00	2024-04-19 15:32:13.715992+00
\.


--
-- Data for Name: services_used; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.services_used ("servicesUsed", quantity, "createdAt", "updatedAt", "roomDetailId", "serviceId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."user" (id, "userName", password, phone, gender, email, "fullName", salary, city, country, "createdAt", "updatedAt", "roleId") FROM stdin;
7	admin	$2b$10$G3NtFnWRtb7qFAs/VKgknebuh9O5qqen1SuTQuGitd35F2OSUWbGK	122131313	2	admin@gmail.com	admin	1212	HCM	VN	2024-04-19 12:21:57.034137+00	2024-04-19 12:21:57.034137+00	1
8	hien	$2b$10$./kt4X4sydxVkezxoE.oceS6v3lZUdNgs6wHv.rQ2jvxq4lgX81dC	1221313113	1	hien@gmail.com	hien	3000	Ha Noi	VN	2024-04-19 12:22:26.774889+00	2024-04-19 12:22:26.774889+00	4
\.


--
-- Name: bill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.bill_id_seq', 1, false);


--
-- Name: manage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.manage_id_seq', 1, false);


--
-- Name: room_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.room_detail_id_seq', 1, false);


--
-- Name: room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.room_id_seq', 1, false);


--
-- Name: room_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.room_service_id_seq', 1, false);


--
-- Name: room_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.room_type_id_seq', 1, false);


--
-- Name: service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.service_id_seq', 3, true);


--
-- Name: services_used_servicesUsed_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."services_used_servicesUsed_seq"', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.user_id_seq', 8, true);


--
-- Name: room_service PK_319e7879b899c0055af6e3b00f3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_service
    ADD CONSTRAINT "PK_319e7879b899c0055af6e3b00f3" PRIMARY KEY (id);


--
-- Name: services_used PK_4f0e4329bb1396f71de79b1de53; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.services_used
    ADD CONSTRAINT "PK_4f0e4329bb1396f71de79b1de53" PRIMARY KEY ("servicesUsed");


--
-- Name: bill PK_683b47912b8b30fe71d1fa22199; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.bill
    ADD CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY (id);


--
-- Name: service PK_85a21558c006647cd76fdce044b; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY (id);


--
-- Name: room_type PK_abd0f8a4c8a444a84fa2b343353; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_type
    ADD CONSTRAINT "PK_abd0f8a4c8a444a84fa2b343353" PRIMARY KEY (id);


--
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- Name: room PK_c6d46db005d623e691b2fbcba23; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY (id);


--
-- Name: manage PK_c9ec0c9e1c10e3a0237c7bab79b; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.manage
    ADD CONSTRAINT "PK_c9ec0c9e1c10e3a0237c7bab79b" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: room_detail PK_e07b2d53e4983a8bae31df7506c; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_detail
    ADD CONSTRAINT "PK_e07b2d53e4983a8bae31df7506c" PRIMARY KEY (id);


--
-- Name: room_detail REL_24370c10b958f6eaa764da6b4a; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_detail
    ADD CONSTRAINT "REL_24370c10b958f6eaa764da6b4a" UNIQUE ("billId");


--
-- Name: room_type UQ_0e04f7180c0010be1afdb248607; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_type
    ADD CONSTRAINT "UQ_0e04f7180c0010be1afdb248607" UNIQUE (name);


--
-- Name: service UQ_7806a14d42c3244064b4a1706ca; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT "UQ_7806a14d42c3244064b4a1706ca" UNIQUE (name);


--
-- Name: user UQ_da5934070b5f2726ebfd3122c80; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName");


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: room_service FK_06dcda94406c6d27b9f09358665; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_service
    ADD CONSTRAINT "FK_06dcda94406c6d27b9f09358665" FOREIGN KEY ("typeId") REFERENCES public.room_type(id);


--
-- Name: room_detail FK_24370c10b958f6eaa764da6b4ab; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_detail
    ADD CONSTRAINT "FK_24370c10b958f6eaa764da6b4ab" FOREIGN KEY ("billId") REFERENCES public.bill(id);


--
-- Name: bill FK_275fe11db713fd6f9fd62709917; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.bill
    ADD CONSTRAINT "FK_275fe11db713fd6f9fd62709917" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: services_used FK_28b15d4f4c221cb21219ed292aa; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.services_used
    ADD CONSTRAINT "FK_28b15d4f4c221cb21219ed292aa" FOREIGN KEY ("roomDetailId") REFERENCES public.room_detail(id);


--
-- Name: manage FK_4866b1113683378742d47a03e88; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.manage
    ADD CONSTRAINT "FK_4866b1113683378742d47a03e88" FOREIGN KEY ("managerId") REFERENCES public."user"(id);


--
-- Name: room_detail FK_84ea0743021406a6c97e6e088ed; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_detail
    ADD CONSTRAINT "FK_84ea0743021406a6c97e6e088ed" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: room_detail FK_8c6afd0bb6d2bfe4c1e4e36ee8e; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_detail
    ADD CONSTRAINT "FK_8c6afd0bb6d2bfe4c1e4e36ee8e" FOREIGN KEY ("roomId") REFERENCES public.room(id);


--
-- Name: manage FK_8e6688bfab87a11d1257e17f262; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.manage
    ADD CONSTRAINT "FK_8e6688bfab87a11d1257e17f262" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: room FK_9e55182c47f8ba7a32466131837; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT "FK_9e55182c47f8ba7a32466131837" FOREIGN KEY ("roomTypeId") REFERENCES public.room_type(id);


--
-- Name: user FK_c28e52f758e7bbc53828db92194; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON DELETE CASCADE;


--
-- Name: services_used FK_c3ec0d2a5a977b33fd4f101f033; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.services_used
    ADD CONSTRAINT "FK_c3ec0d2a5a977b33fd4f101f033" FOREIGN KEY ("serviceId") REFERENCES public.service(id);


--
-- Name: room_service FK_fc46b7b44ee6df2966179936791; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_service
    ADD CONSTRAINT "FK_fc46b7b44ee6df2966179936791" FOREIGN KEY ("serviceId") REFERENCES public.service(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Debian 15.6-1.pgdg120+2)
-- Dumped by pg_dump version 15.6 (Debian 15.6-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO root;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: root
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

