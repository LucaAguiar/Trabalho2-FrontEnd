<template>
    <div class="suppliers-container">
        <h5 class="content-title">FORNECEDORES</h5>
        <div class="body-wrapper">
            <div>
                <b-nav tabs>
                    <b-nav-item active>Detalhes</b-nav-item>
                </b-nav>
            </div>
            <div class="body-content">
                <div class="description">DESCRIÇÃO</div>
                <b-form
                    @submit="createSupplier()"
                    class="form-supplier"
                    novalidate
                >
                    <div class="description-input-container">
                        <b-form-textarea
                            id="textarea-description"
                            v-model="description"
                            placeholder="Escreva aqui..."
                            rows="8"
                            no-resize
                            :state="stateDescription"
                        ></b-form-textarea>
                        <b-form-invalid-feedback
                            id="textarea-description"
                            class="invalid-message"
                        >
                            Campo vazio ou inválido
                        </b-form-invalid-feedback>
                    </div>
                    <div class="button-save-container">
                        <b-button
                            class="button-save"
                            id="submit"
                            type="submit"
                            :disabled="onLoad"
                            >Salvar alterações</b-button
                        >
                    </div>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "SuppliersView",
    data() {
        return {
            description: null,
            stateDescription: null,
            onLoad: false,
        };
    },
    methods: {
        descriptionValidation: function () {
            return this.description?.length > 0 || false;
        },
        openModal: function (title, msg, variant) {
            this.$bvModal
                .msgBoxOk(msg, {
                    title: title,
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: variant,
                    headerClass: "p-2",
                    footerClass: "p-0",
                    centered: true,
                    okTitle: "Fechar",
                })
                .then(() => {
                    this.$router.go(0);
                });
        },
        deleteSuppliers: function () {
            axios.delete(`/api/supplier/delete/${index}`).then((response) => {
                console.log(response);
            });
        },
        createSupplier: function () {
            if (!this.descriptionValidation())
                return (this.stateDescription = false);
            this.$store.dispatch("isLoaded");
            return axios
                .post("api/supplier/add", {
                    description: this.description,
                })
                .then(() => {
                    this.openModal(
                        "Confirmado!",
                        "Fornecedor cadastrado com sucesso.",
                        "success"
                    );
                    this.$store.dispatch("notIsLoaded");
                })
                .catch((error) => {
                    console.log(error);
                    this.openModal(
                        "Algo deu errado!",
                        "Fornecedor não cadastrado, tente novamente.",
                        "danger"
                    );
                    this.$store.dispatch("notIsLoaded");
                });
        },
    },
    watch: {
        description: function () {
            this.stateDescription = this.descriptionValidation();
        },
    },
};
</script>

<style scoped>
.suppliers-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.content-title {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.65px;
    text-align: start;
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
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 30px 50px;
    background-color: #444444;
}
.form-supplier {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
input.is-invalid {
    background-color: #555555 !important;
}
.invalid-message {
    font-size: 13px;
    font-weight: 300;
}
.description-input-container {
    text-align: start;
}
.description {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 1.4px;
    color: #888888;
    text-align: start;
    margin-bottom: 20px;
}

.form-control {
    background-color: #555555;
    border: 0;
    border-bottom-style: solid;
    border-bottom-color: #555555;
    border-bottom-width: 2px;
    color: #888888;
}

.form-control:focus {
    background-color: #555555;
    box-shadow: none;
    color: #888888;
    border-color: #69fe66;
}
.form-control::placeholder {
    color: #888888;
}

.button-save-container {
    margin-top: auto;
    display: flex;
    width: 100%;
    justify-content: center;
}

.button-save {
    background: linear-gradient(0deg, #008f1f 0%, #69fe66 100%), #222222;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.15);
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 1.5px;
    padding: 15px 25px;
    border: 0;
    transition: 0.5s;
}

.button-save:hover {
    background: linear-gradient(0deg, #01821d 0%, #6de66b 100%), #333333;
    transform: scale(1.05);
}
</style>
