<template>
    <div class="suppliers-container">
        <h5 class="content-title">PRODUTOS</h5>
        <div class="body-wrapper">
            <div>
                <b-nav tabs>
                    <b-nav-item active>Detalhes</b-nav-item>
                </b-nav>
            </div>
            <div class="body-content">
                <b-form
                    @submit="createProduct()"
                    class="form-product"
                    novalidate
                >
                    <div class="inputs-container">
                        <div class="input-wrapper">
                            <div class="description">VALOR</div>
                            <b-form-input
                                id="input-value"
                                v-model="value"
                                type="number"
                                placeholder="R$ 00,00"
                                min="1"
                                :state="stateValue"
                            ></b-form-input>
                            <b-form-invalid-feedback
                                id="input-value"
                                class="invalid-message"
                            >
                                Campo vazio ou inválido
                            </b-form-invalid-feedback>
                        </div>
                        <div class="input-wrapper">
                            <div class="description">QUANTIDADE</div>
                            <b-form-input
                                id="input-quantity"
                                v-model="quantity"
                                type="number"
                                placeholder="0"
                                min="1"
                                :state="stateQuantity"
                            ></b-form-input>
                            <b-form-invalid-feedback
                                id="input-quantity"
                                class="invalid-message"
                            >
                                Campo vazio ou inválido
                            </b-form-invalid-feedback>
                        </div>
                        <div class="input-wrapper">
                            <div class="description">ID FORNECEDOR</div>
                            <b-form-input
                                id="input-supplier"
                                v-model="idSupplier"
                                type="number"
                                placeholder="0"
                                min="1"
                                :state="stateIdSupplier"
                            ></b-form-input>
                            <b-form-invalid-feedback
                                id="input-supplier"
                                class="invalid-message"
                            >
                                Campo vazio ou inválido
                            </b-form-invalid-feedback>
                        </div>
                    </div>
                    <div class="description">DESCRIÇÃO</div>
                    <div class="description-input-container">
                        <b-form-textarea
                            id="textarea-description"
                            v-model="description"
                            placeholder="Escreva aqui..."
                            rows="4"
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
    name: "ProductView",
    data() {
        return {
            value: null,
            quantity: null,
            idSupplier: null,
            description: null,
            stateValue: null,
            stateQuantity: null,
            stateIdSupplier: null,
            stateDescription: null,
            onLoad: false,
        };
    },
    methods: {
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
        valueValidation: function () {
            return this.value > 0 || false;
        },
        quantityValidation: function () {
            return this.quantity > 0 || false;
        },
        supplierValidation: function () {
            return this.idSupplier > 0 || false;
        },
        descriptionValidation: function () {
            return this.description?.length > 0 || false;
        },
        createProduct: function () {
            if (!this.valueValidation()) return (this.stateValue = false);
            if (!this.quantityValidation()) return (this.stateQuantity = false);
            if (!this.supplierValidation())
                return (this.stateIdSupplier = false);
            if (!this.descriptionValidation())
                return (this.stateDescription = false);
            this.$store.dispatch("isLoaded");
            return axios
                .post("api/product/add", {
                    description: this.description,
                    value: this.value,
                    quantity: this.quantity,
                    supplier: {
                        id: this.idSupplier,
                    },
                })
                .then(() => {
                    this.openModal(
                        "Confirmado!",
                        "Produto cadastrado com sucesso.",
                        "success"
                    );
                    this.$store.dispatch("notIsLoaded");
                })
                .catch((error) => {
                    console.log(error);
                    this.openModal(
                        "Algo deu errado!",
                        "Produto não cadastrado, tente novamente.",
                        "danger"
                    );
                    this.$store.dispatch("notIsLoaded");
                });
        },
    },
    watch: {
        value: function () {
            this.stateValue = this.valueValidation();
        },
        quantity: function () {
            this.stateQuantity = this.quantityValidation();
        },
        idSupplier: function () {
            this.stateIdSupplier = this.supplierValidation();
        },
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

.form-product {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.inputs-container {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}
input.is-invalid {
    background-color: #555555 !important;
}
.invalid-message {
    font-size: 13px;
    font-weight: 300;
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
