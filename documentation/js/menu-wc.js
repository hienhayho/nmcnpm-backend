'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nmcnpm-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-73d7da6a3fdc5713cc5e5bb7f9579c07e104937e0391534cdb6e477e521b276202d6c6c515939c96933e0053b7b84aa8d3bd57bea34a62b20296d5ec0c89250a"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-73d7da6a3fdc5713cc5e5bb7f9579c07e104937e0391534cdb6e477e521b276202d6c6c515939c96933e0053b7b84aa8d3bd57bea34a62b20296d5ec0c89250a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-73d7da6a3fdc5713cc5e5bb7f9579c07e104937e0391534cdb6e477e521b276202d6c6c515939c96933e0053b7b84aa8d3bd57bea34a62b20296d5ec0c89250a"' :
                                            'id="xs-controllers-links-module-AuthModule-73d7da6a3fdc5713cc5e5bb7f9579c07e104937e0391534cdb6e477e521b276202d6c6c515939c96933e0053b7b84aa8d3bd57bea34a62b20296d5ec0c89250a"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-73d7da6a3fdc5713cc5e5bb7f9579c07e104937e0391534cdb6e477e521b276202d6c6c515939c96933e0053b7b84aa8d3bd57bea34a62b20296d5ec0c89250a"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-73d7da6a3fdc5713cc5e5bb7f9579c07e104937e0391534cdb6e477e521b276202d6c6c515939c96933e0053b7b84aa8d3bd57bea34a62b20296d5ec0c89250a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-73d7da6a3fdc5713cc5e5bb7f9579c07e104937e0391534cdb6e477e521b276202d6c6c515939c96933e0053b7b84aa8d3bd57bea34a62b20296d5ec0c89250a"' :
                                        'id="xs-injectables-links-module-AuthModule-73d7da6a3fdc5713cc5e5bb7f9579c07e104937e0391534cdb6e477e521b276202d6c6c515939c96933e0053b7b84aa8d3bd57bea34a62b20296d5ec0c89250a"' }>
                                        <li class="link">
                                            <a href="injectables/LoginService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RegisterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BillModule.html" data-type="entity-link" >BillModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BillModule-e8a238fa425ebfa45166d4e83f1330b3337cb0e81ea4d47b64c0e5be3f0cf420144b23fdede3a670893086b1744586c468e9cc1341612aa0b935a9f03314fa5f"' : 'data-bs-target="#xs-controllers-links-module-BillModule-e8a238fa425ebfa45166d4e83f1330b3337cb0e81ea4d47b64c0e5be3f0cf420144b23fdede3a670893086b1744586c468e9cc1341612aa0b935a9f03314fa5f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BillModule-e8a238fa425ebfa45166d4e83f1330b3337cb0e81ea4d47b64c0e5be3f0cf420144b23fdede3a670893086b1744586c468e9cc1341612aa0b935a9f03314fa5f"' :
                                            'id="xs-controllers-links-module-BillModule-e8a238fa425ebfa45166d4e83f1330b3337cb0e81ea4d47b64c0e5be3f0cf420144b23fdede3a670893086b1744586c468e9cc1341612aa0b935a9f03314fa5f"' }>
                                            <li class="link">
                                                <a href="controllers/BillController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BillController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BillModule-e8a238fa425ebfa45166d4e83f1330b3337cb0e81ea4d47b64c0e5be3f0cf420144b23fdede3a670893086b1744586c468e9cc1341612aa0b935a9f03314fa5f"' : 'data-bs-target="#xs-injectables-links-module-BillModule-e8a238fa425ebfa45166d4e83f1330b3337cb0e81ea4d47b64c0e5be3f0cf420144b23fdede3a670893086b1744586c468e9cc1341612aa0b935a9f03314fa5f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BillModule-e8a238fa425ebfa45166d4e83f1330b3337cb0e81ea4d47b64c0e5be3f0cf420144b23fdede3a670893086b1744586c468e9cc1341612aa0b935a9f03314fa5f"' :
                                        'id="xs-injectables-links-module-BillModule-e8a238fa425ebfa45166d4e83f1330b3337cb0e81ea4d47b64c0e5be3f0cf420144b23fdede3a670893086b1744586c468e9cc1341612aa0b935a9f03314fa5f"' }>
                                        <li class="link">
                                            <a href="injectables/BillService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BillService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ManageModule.html" data-type="entity-link" >ManageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ManageModule-129abe6f2e6870d4f0535dbff8072fc8949aa3b866180fa127dd05b6521a4bda240f4485c081b01b5f4088deb2a3c26a66eff4462bc6a1f46113a510cf3698de"' : 'data-bs-target="#xs-controllers-links-module-ManageModule-129abe6f2e6870d4f0535dbff8072fc8949aa3b866180fa127dd05b6521a4bda240f4485c081b01b5f4088deb2a3c26a66eff4462bc6a1f46113a510cf3698de"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ManageModule-129abe6f2e6870d4f0535dbff8072fc8949aa3b866180fa127dd05b6521a4bda240f4485c081b01b5f4088deb2a3c26a66eff4462bc6a1f46113a510cf3698de"' :
                                            'id="xs-controllers-links-module-ManageModule-129abe6f2e6870d4f0535dbff8072fc8949aa3b866180fa127dd05b6521a4bda240f4485c081b01b5f4088deb2a3c26a66eff4462bc6a1f46113a510cf3698de"' }>
                                            <li class="link">
                                                <a href="controllers/ManageController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ManageModule-129abe6f2e6870d4f0535dbff8072fc8949aa3b866180fa127dd05b6521a4bda240f4485c081b01b5f4088deb2a3c26a66eff4462bc6a1f46113a510cf3698de"' : 'data-bs-target="#xs-injectables-links-module-ManageModule-129abe6f2e6870d4f0535dbff8072fc8949aa3b866180fa127dd05b6521a4bda240f4485c081b01b5f4088deb2a3c26a66eff4462bc6a1f46113a510cf3698de"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ManageModule-129abe6f2e6870d4f0535dbff8072fc8949aa3b866180fa127dd05b6521a4bda240f4485c081b01b5f4088deb2a3c26a66eff4462bc6a1f46113a510cf3698de"' :
                                        'id="xs-injectables-links-module-ManageModule-129abe6f2e6870d4f0535dbff8072fc8949aa3b866180fa127dd05b6521a4bda240f4485c081b01b5f4088deb2a3c26a66eff4462bc6a1f46113a510cf3698de"' }>
                                        <li class="link">
                                            <a href="injectables/ManageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoleModule-40c99de4a146bbd1d5b99ad870b93d4f8ccf7f2d212a4d17d71940278d3b26b038cbd08e91a786d83937f67e5e90d340eeaed93a8162d7e7c29d6f5fd309d82f"' : 'data-bs-target="#xs-controllers-links-module-RoleModule-40c99de4a146bbd1d5b99ad870b93d4f8ccf7f2d212a4d17d71940278d3b26b038cbd08e91a786d83937f67e5e90d340eeaed93a8162d7e7c29d6f5fd309d82f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoleModule-40c99de4a146bbd1d5b99ad870b93d4f8ccf7f2d212a4d17d71940278d3b26b038cbd08e91a786d83937f67e5e90d340eeaed93a8162d7e7c29d6f5fd309d82f"' :
                                            'id="xs-controllers-links-module-RoleModule-40c99de4a146bbd1d5b99ad870b93d4f8ccf7f2d212a4d17d71940278d3b26b038cbd08e91a786d83937f67e5e90d340eeaed93a8162d7e7c29d6f5fd309d82f"' }>
                                            <li class="link">
                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RoleModule-40c99de4a146bbd1d5b99ad870b93d4f8ccf7f2d212a4d17d71940278d3b26b038cbd08e91a786d83937f67e5e90d340eeaed93a8162d7e7c29d6f5fd309d82f"' : 'data-bs-target="#xs-injectables-links-module-RoleModule-40c99de4a146bbd1d5b99ad870b93d4f8ccf7f2d212a4d17d71940278d3b26b038cbd08e91a786d83937f67e5e90d340eeaed93a8162d7e7c29d6f5fd309d82f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoleModule-40c99de4a146bbd1d5b99ad870b93d4f8ccf7f2d212a4d17d71940278d3b26b038cbd08e91a786d83937f67e5e90d340eeaed93a8162d7e7c29d6f5fd309d82f"' :
                                        'id="xs-injectables-links-module-RoleModule-40c99de4a146bbd1d5b99ad870b93d4f8ccf7f2d212a4d17d71940278d3b26b038cbd08e91a786d83937f67e5e90d340eeaed93a8162d7e7c29d6f5fd309d82f"' }>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoomDetailModule.html" data-type="entity-link" >RoomDetailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoomDetailModule-2df7e1d7bf6f48f10feb5d8993c2160bf2248b65c197024246021a7db93583b516d15d17519b2b756db598a895c3f87dc14cf3b45616c6045f4d74f787cbb364"' : 'data-bs-target="#xs-controllers-links-module-RoomDetailModule-2df7e1d7bf6f48f10feb5d8993c2160bf2248b65c197024246021a7db93583b516d15d17519b2b756db598a895c3f87dc14cf3b45616c6045f4d74f787cbb364"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoomDetailModule-2df7e1d7bf6f48f10feb5d8993c2160bf2248b65c197024246021a7db93583b516d15d17519b2b756db598a895c3f87dc14cf3b45616c6045f4d74f787cbb364"' :
                                            'id="xs-controllers-links-module-RoomDetailModule-2df7e1d7bf6f48f10feb5d8993c2160bf2248b65c197024246021a7db93583b516d15d17519b2b756db598a895c3f87dc14cf3b45616c6045f4d74f787cbb364"' }>
                                            <li class="link">
                                                <a href="controllers/RoomDetailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomDetailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RoomDetailModule-2df7e1d7bf6f48f10feb5d8993c2160bf2248b65c197024246021a7db93583b516d15d17519b2b756db598a895c3f87dc14cf3b45616c6045f4d74f787cbb364"' : 'data-bs-target="#xs-injectables-links-module-RoomDetailModule-2df7e1d7bf6f48f10feb5d8993c2160bf2248b65c197024246021a7db93583b516d15d17519b2b756db598a895c3f87dc14cf3b45616c6045f4d74f787cbb364"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoomDetailModule-2df7e1d7bf6f48f10feb5d8993c2160bf2248b65c197024246021a7db93583b516d15d17519b2b756db598a895c3f87dc14cf3b45616c6045f4d74f787cbb364"' :
                                        'id="xs-injectables-links-module-RoomDetailModule-2df7e1d7bf6f48f10feb5d8993c2160bf2248b65c197024246021a7db93583b516d15d17519b2b756db598a895c3f87dc14cf3b45616c6045f4d74f787cbb364"' }>
                                        <li class="link">
                                            <a href="injectables/RoomDetailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomDetailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoomModule.html" data-type="entity-link" >RoomModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoomModule-220f8978939ce26e1b1cb4d15a837a721311ea3eee29c632f9b3e5e48c5b733dc9bfd59c781b638bc8f9573b7520d49eaff5fe8f1ab5df1dd79414d41113db19"' : 'data-bs-target="#xs-controllers-links-module-RoomModule-220f8978939ce26e1b1cb4d15a837a721311ea3eee29c632f9b3e5e48c5b733dc9bfd59c781b638bc8f9573b7520d49eaff5fe8f1ab5df1dd79414d41113db19"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoomModule-220f8978939ce26e1b1cb4d15a837a721311ea3eee29c632f9b3e5e48c5b733dc9bfd59c781b638bc8f9573b7520d49eaff5fe8f1ab5df1dd79414d41113db19"' :
                                            'id="xs-controllers-links-module-RoomModule-220f8978939ce26e1b1cb4d15a837a721311ea3eee29c632f9b3e5e48c5b733dc9bfd59c781b638bc8f9573b7520d49eaff5fe8f1ab5df1dd79414d41113db19"' }>
                                            <li class="link">
                                                <a href="controllers/RoomController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RoomModule-220f8978939ce26e1b1cb4d15a837a721311ea3eee29c632f9b3e5e48c5b733dc9bfd59c781b638bc8f9573b7520d49eaff5fe8f1ab5df1dd79414d41113db19"' : 'data-bs-target="#xs-injectables-links-module-RoomModule-220f8978939ce26e1b1cb4d15a837a721311ea3eee29c632f9b3e5e48c5b733dc9bfd59c781b638bc8f9573b7520d49eaff5fe8f1ab5df1dd79414d41113db19"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoomModule-220f8978939ce26e1b1cb4d15a837a721311ea3eee29c632f9b3e5e48c5b733dc9bfd59c781b638bc8f9573b7520d49eaff5fe8f1ab5df1dd79414d41113db19"' :
                                        'id="xs-injectables-links-module-RoomModule-220f8978939ce26e1b1cb4d15a837a721311ea3eee29c632f9b3e5e48c5b733dc9bfd59c781b638bc8f9573b7520d49eaff5fe8f1ab5df1dd79414d41113db19"' }>
                                        <li class="link">
                                            <a href="injectables/RoomService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoomTypeModule.html" data-type="entity-link" >RoomTypeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoomTypeModule-a75fc1097285352c068652b28ea0447d425c5a849e02331a79517c16e9b06257d3562dfe2136e270b367485be63bca78ce000e38d84b32c4d24a97b130fe8901"' : 'data-bs-target="#xs-controllers-links-module-RoomTypeModule-a75fc1097285352c068652b28ea0447d425c5a849e02331a79517c16e9b06257d3562dfe2136e270b367485be63bca78ce000e38d84b32c4d24a97b130fe8901"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoomTypeModule-a75fc1097285352c068652b28ea0447d425c5a849e02331a79517c16e9b06257d3562dfe2136e270b367485be63bca78ce000e38d84b32c4d24a97b130fe8901"' :
                                            'id="xs-controllers-links-module-RoomTypeModule-a75fc1097285352c068652b28ea0447d425c5a849e02331a79517c16e9b06257d3562dfe2136e270b367485be63bca78ce000e38d84b32c4d24a97b130fe8901"' }>
                                            <li class="link">
                                                <a href="controllers/RoomTypeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomTypeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RoomTypeModule-a75fc1097285352c068652b28ea0447d425c5a849e02331a79517c16e9b06257d3562dfe2136e270b367485be63bca78ce000e38d84b32c4d24a97b130fe8901"' : 'data-bs-target="#xs-injectables-links-module-RoomTypeModule-a75fc1097285352c068652b28ea0447d425c5a849e02331a79517c16e9b06257d3562dfe2136e270b367485be63bca78ce000e38d84b32c4d24a97b130fe8901"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoomTypeModule-a75fc1097285352c068652b28ea0447d425c5a849e02331a79517c16e9b06257d3562dfe2136e270b367485be63bca78ce000e38d84b32c4d24a97b130fe8901"' :
                                        'id="xs-injectables-links-module-RoomTypeModule-a75fc1097285352c068652b28ea0447d425c5a849e02331a79517c16e9b06257d3562dfe2136e270b367485be63bca78ce000e38d84b32c4d24a97b130fe8901"' }>
                                        <li class="link">
                                            <a href="injectables/RoomTypeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomTypeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesModule.html" data-type="entity-link" >ServicesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ServicesModule-340d9708c619b477b91f63986e4c9b29847b644c1e7de3a2bd71cf244a0b8a52315619ae9de702b7837fa7a4a4b68aadacb52a9b9f1440cce269887ced4ed089"' : 'data-bs-target="#xs-controllers-links-module-ServicesModule-340d9708c619b477b91f63986e4c9b29847b644c1e7de3a2bd71cf244a0b8a52315619ae9de702b7837fa7a4a4b68aadacb52a9b9f1440cce269887ced4ed089"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServicesModule-340d9708c619b477b91f63986e4c9b29847b644c1e7de3a2bd71cf244a0b8a52315619ae9de702b7837fa7a4a4b68aadacb52a9b9f1440cce269887ced4ed089"' :
                                            'id="xs-controllers-links-module-ServicesModule-340d9708c619b477b91f63986e4c9b29847b644c1e7de3a2bd71cf244a0b8a52315619ae9de702b7837fa7a4a4b68aadacb52a9b9f1440cce269887ced4ed089"' }>
                                            <li class="link">
                                                <a href="controllers/ServicesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ServicesModule-340d9708c619b477b91f63986e4c9b29847b644c1e7de3a2bd71cf244a0b8a52315619ae9de702b7837fa7a4a4b68aadacb52a9b9f1440cce269887ced4ed089"' : 'data-bs-target="#xs-injectables-links-module-ServicesModule-340d9708c619b477b91f63986e4c9b29847b644c1e7de3a2bd71cf244a0b8a52315619ae9de702b7837fa7a4a4b68aadacb52a9b9f1440cce269887ced4ed089"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ServicesModule-340d9708c619b477b91f63986e4c9b29847b644c1e7de3a2bd71cf244a0b8a52315619ae9de702b7837fa7a4a4b68aadacb52a9b9f1440cce269887ced4ed089"' :
                                        'id="xs-injectables-links-module-ServicesModule-340d9708c619b477b91f63986e4c9b29847b644c1e7de3a2bd71cf244a0b8a52315619ae9de702b7837fa7a4a4b68aadacb52a9b9f1440cce269887ced4ed089"' }>
                                        <li class="link">
                                            <a href="injectables/ServicesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesUsedModule.html" data-type="entity-link" >ServicesUsedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ServicesUsedModule-7adc35ff5005b29f251428ed2bd48d02d9daf60765ed38193f43e5141345c7530d63f290626afe4b73a808152cd52368ae8be4951b6605f2131618d036c931f9"' : 'data-bs-target="#xs-controllers-links-module-ServicesUsedModule-7adc35ff5005b29f251428ed2bd48d02d9daf60765ed38193f43e5141345c7530d63f290626afe4b73a808152cd52368ae8be4951b6605f2131618d036c931f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServicesUsedModule-7adc35ff5005b29f251428ed2bd48d02d9daf60765ed38193f43e5141345c7530d63f290626afe4b73a808152cd52368ae8be4951b6605f2131618d036c931f9"' :
                                            'id="xs-controllers-links-module-ServicesUsedModule-7adc35ff5005b29f251428ed2bd48d02d9daf60765ed38193f43e5141345c7530d63f290626afe4b73a808152cd52368ae8be4951b6605f2131618d036c931f9"' }>
                                            <li class="link">
                                                <a href="controllers/ServicesUsedController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesUsedController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ServicesUsedModule-7adc35ff5005b29f251428ed2bd48d02d9daf60765ed38193f43e5141345c7530d63f290626afe4b73a808152cd52368ae8be4951b6605f2131618d036c931f9"' : 'data-bs-target="#xs-injectables-links-module-ServicesUsedModule-7adc35ff5005b29f251428ed2bd48d02d9daf60765ed38193f43e5141345c7530d63f290626afe4b73a808152cd52368ae8be4951b6605f2131618d036c931f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ServicesUsedModule-7adc35ff5005b29f251428ed2bd48d02d9daf60765ed38193f43e5141345c7530d63f290626afe4b73a808152cd52368ae8be4951b6605f2131618d036c931f9"' :
                                        'id="xs-injectables-links-module-ServicesUsedModule-7adc35ff5005b29f251428ed2bd48d02d9daf60765ed38193f43e5141345c7530d63f290626afe4b73a808152cd52368ae8be4951b6605f2131618d036c931f9"' }>
                                        <li class="link">
                                            <a href="injectables/ServicesUsedService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesUsedService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-7d091e7bba2df9a2d3c1b366f467306cdecd3f2c392fa9d479cd89429e390c2f1de28f72e0dcdd62c8b92420b286f63ec72d1f640706cea414f645dfc5455e42"' : 'data-bs-target="#xs-controllers-links-module-UserModule-7d091e7bba2df9a2d3c1b366f467306cdecd3f2c392fa9d479cd89429e390c2f1de28f72e0dcdd62c8b92420b286f63ec72d1f640706cea414f645dfc5455e42"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-7d091e7bba2df9a2d3c1b366f467306cdecd3f2c392fa9d479cd89429e390c2f1de28f72e0dcdd62c8b92420b286f63ec72d1f640706cea414f645dfc5455e42"' :
                                            'id="xs-controllers-links-module-UserModule-7d091e7bba2df9a2d3c1b366f467306cdecd3f2c392fa9d479cd89429e390c2f1de28f72e0dcdd62c8b92420b286f63ec72d1f640706cea414f645dfc5455e42"' }>
                                            <li class="link">
                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-7d091e7bba2df9a2d3c1b366f467306cdecd3f2c392fa9d479cd89429e390c2f1de28f72e0dcdd62c8b92420b286f63ec72d1f640706cea414f645dfc5455e42"' : 'data-bs-target="#xs-injectables-links-module-UserModule-7d091e7bba2df9a2d3c1b366f467306cdecd3f2c392fa9d479cd89429e390c2f1de28f72e0dcdd62c8b92420b286f63ec72d1f640706cea414f645dfc5455e42"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-7d091e7bba2df9a2d3c1b366f467306cdecd3f2c392fa9d479cd89429e390c2f1de28f72e0dcdd62c8b92420b286f63ec72d1f640706cea414f645dfc5455e42"' :
                                        'id="xs-injectables-links-module-UserModule-7d091e7bba2df9a2d3c1b366f467306cdecd3f2c392fa9d479cd89429e390c2f1de28f72e0dcdd62c8b92420b286f63ec72d1f640706cea414f645dfc5455e42"' }>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Bill.html" data-type="entity-link" >Bill</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Manage.html" data-type="entity-link" >Manage</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Role.html" data-type="entity-link" >Role</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Room.html" data-type="entity-link" >Room</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RoomDetail.html" data-type="entity-link" >RoomDetail</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RoomType.html" data-type="entity-link" >RoomType</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Service.html" data-type="entity-link" >Service</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ServicesUsed.html" data-type="entity-link" >ServicesUsed</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddNewUserDto.html" data-type="entity-link" >AddNewUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBillDto.html" data-type="entity-link" >CreateBillDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateManageDto.html" data-type="entity-link" >CreateManageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoomDetailDto.html" data-type="entity-link" >CreateRoomDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoomDto.html" data-type="entity-link" >CreateRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateServiceDto.html" data-type="entity-link" >CreateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateServicesUsedDto.html" data-type="entity-link" >CreateServicesUsedDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteRoleDto.html" data-type="entity-link" >DeleteRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoomTypeAddNewDto.html" data-type="entity-link" >RoomTypeAddNewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBillDto.html" data-type="entity-link" >UpdateBillDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateManageDto.html" data-type="entity-link" >UpdateManageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRole.html" data-type="entity-link" >UpdateRole</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoomDetailDto.html" data-type="entity-link" >UpdateRoomDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoomDto.html" data-type="entity-link" >UpdateRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoomTypeDto.html" data-type="entity-link" >UpdateRoomTypeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateServiceDto.html" data-type="entity-link" >UpdateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateServicesUsedDto.html" data-type="entity-link" >UpdateServicesUsedDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserBackendDto.html" data-type="entity-link" >UserBackendDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLogin.html" data-type="entity-link" >UserLogin</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRegister.html" data-type="entity-link" >UserRegister</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserUpdate.html" data-type="entity-link" >UserUpdate</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppLoggerMiddleware.html" data-type="entity-link" >AppLoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});