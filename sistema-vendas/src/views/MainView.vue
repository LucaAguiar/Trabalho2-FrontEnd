<template>
    <div class="layout-container">
        <div class="lateral-menu-container">
            <div class="first-items-menu">
                <div class="home-item-container">
                    <div class="icon-container">
                        <b-icon-house-fill scale="1.2"></b-icon-house-fill>
                    </div>
                    <div class="description-container">Home</div>
                    <div class="home-item-shadow"></div>
                </div>

                <div class="menu-options-container">
                    <div class="icon-container">
                        <b-icon-people scale="1.1" />
                    </div>
                    <div class="description-container">Fornecedores</div>
                </div>
                <div class="menu-options-container">
                    <div class="icon-container">
                        <b-icon-stack scale="1.1" />
                    </div>
                    <div class="description-container">Produtos</div>
                </div>
                <div class="menu-options-container">
                    <div class="icon-container">
                        <b-icon-cart-plus scale="1.1" />
                    </div>
                    <div class="description-container">Venda</div>
                </div>
            </div>
            <div class="secondary-items-menu">
                <div class="menu-options-container">
                    <div class="icon-container">
                        <b-icon-sliders scale="1.1" />
                    </div>
                    <div class="description-container">Configurações</div>
                </div>
                <div class="menu-options-container">
                    <div class="icon-container">
                        <b-icon-info-circle scale="1.1" />
                    </div>
                    <div class="description-container">Ajuda</div>
                </div>
            </div>
        </div>
        <div class="layout-wrapper">
            <div class="search-bar-container">
                <div class="search-bar-wrapper">
                    <b-input-group>
                        <b-input-group-prepend>
                            <div class="icon-search-container">
                                <b-icon-search />
                            </div>
                        </b-input-group-prepend>
                        <b-form-input
                            class="search-input"
                            placeholder="Pesquise por..."
                        ></b-form-input>
                    </b-input-group>
                </div>
                <div class="profile-container">
                    <div class="pipe"></div>
                    <div class="profile-wrapper">
                        <div class="profile"></div>
                        <div class="icon">
                            <b-icon-caret-down-fill scale="0.8" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="body-container">
                <h5 class="content-title">FORNECEDORES</h5>
                <div class="body-wrapper">
                    <div>
                        <b-nav tabs>
                            <b-nav-item active>Detalhes</b-nav-item>
                        </b-nav>
                    </div>
                    <div class="body-content">
                        <router-view />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MainView",
};
</script>

<style scoped>
.layout-container {
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: #222222;
}
.layout-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.lateral-menu-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 220px;
    height: 100%;
    background: linear-gradient(
            79.96deg,
            rgba(85, 85, 85, 0.25) 6.05%,
            rgba(85, 85, 85, 0.0001) 93.67%
        ),
        #333333;
}
.home-item-container {
    position: relative;
    display: flex;
    align-items: center;
    padding: 14px;
    gap: 25px;
}
.home-item-shadow {
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-left: 20px solid rgba(0, 0, 0, 0.3);
    transform: skewX(-20deg);
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
}
.description-container {
    font-size: 14px;
    font-weight: 300;
}
.menu-options-container {
    display: flex;
    align-items: center;
    padding: 8px 14px;
    gap: 25px;
    transition: 0.5s;
    cursor: pointer;
}
.menu-options-container:hover {
    background: linear-gradient(90deg, #008f1f 0%, #69fe66 100%), #222222;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.05);
}
.secondary-items-menu {
    margin-bottom: 50px;
}
.search-bar-container {
    display: flex;
    width: 100%;
    background-color: #333333;
    height: 52px;
    padding: 10px 5px;
    color: #dadada;
    justify-content: space-between;
}
.search-bar-wrapper {
    width: 60%;
    height: 100%;
}
.icon-search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 100%;
    font-size: 14px;
}
.search-input {
    background-color: #333333;
    border: 0;
    color: #888888;
    border-bottom-style: solid;
    border-bottom-color: #555555;
    border-bottom-width: 2px;
    border-radius: 0;
}
.search-input::placeholder {
    color: #888888;
    font-size: 15px;
}
.search-input:focus {
    background-color: #333333;
    box-shadow: none;
    color: #888888;
    border-color: #69fe66;
}
.profile-container {
    display: flex;
    align-items: center;
    width: 80px;
    height: 100%;
    gap: 25px;
}
.pipe {
    width: 2px;
    background-color: #555555;
    height: 100%;
}
.profile {
    display: flex;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background-color: #eeeeee;
}
.profile-wrapper {
    display: flex;
    gap: 5px;
}
.body-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 35px;
}
.body-wrapper {
    display: flex;
    flex-direction: column;
    background-color: #333333;
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
    background-color: #444444 !important;
    margin: 5px 0 0 35px;
    border: 0;
    color: white;
    font-weight: 400;
    font-size: 14px;
}
.nav-tabs {
    border-bottom: 0 !important;
}
.body-content {
    display: flex;
    width: 100%;
    height: 100%;
}
.content-title {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.65px;
}
</style>
