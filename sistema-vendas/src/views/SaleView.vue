<template>
    <div class="sale-container">
        <h5 class="content-title">VENDA</h5>
        <div class="body-wrapper">
            <div>
                <b-nav tabs>
                    <b-nav-item active>Detalhes</b-nav-item>
                </b-nav>
            </div>
            <div class="body-content">
                <b-table-simple hover small responsive class="table-sale">
                    <b-thead>
                        <b-tr>
                            <b-th class="table-head">Cod. Produto</b-th>
                            <b-th class="table-head">Desc. Produto</b-th>
                            <b-th class="table-head">Qtd. Itens</b-th>
                            <b-th class="table-head">Cod. fornecedor</b-th>
                            <b-th class="table-head">Subtotal</b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr
                            v-for="(item, index) in items"
                            :key="item.codProduto"
                            @click="removeItem(index)"
                        >
                            <b-td class="table-body">{{
                                item.product.code
                            }}</b-td>
                            <b-td class="table-body">{{
                                item.product.description
                            }}</b-td>
                            <b-td class="table-body">{{ item.quantity }}</b-td>
                            <b-td class="table-body">{{
                                item.product.supplier.id
                            }}</b-td>
                            <b-td class="table-body">
                                R$ {{ item.partialValue }}</b-td
                            >
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
                <div class="buttons-container">
                    <div class="add-item-container">
                        <b-button
                            class="button-add"
                            @click="showOptionsAddItem()"
                            v-if="!show"
                            >Adicionar item</b-button
                        >
                        <div class="input-wrapper" v-if="show">
                            <div class="description">COD. PRODUTO</div>
                            <b-form-input
                                id="input-code-product"
                                v-model="codeProduct"
                                type="number"
                                placeholder="0"
                                min="1"
                                :state="stateCodeProduct"
                            ></b-form-input>
                            <b-form-invalid-feedback
                                id="input-code-product"
                                class="invalid-message"
                            >
                                Campo vazio ou inválido
                            </b-form-invalid-feedback>
                        </div>
                        <div class="input-wrapper" v-if="show">
                            <div class="description">COD. VENDEDOR</div>
                            <b-form-input
                                id="input-code-seller"
                                v-model="codeSeller"
                                type="number"
                                placeholder="0"
                                min="1"
                                :state="stateCodeSeller"
                            ></b-form-input>
                            <b-form-invalid-feedback
                                id="input-code-seller"
                                class="invalid-message"
                            >
                                Campo vazio ou inválido
                            </b-form-invalid-feedback>
                        </div>
                        <div class="input-wrapper" v-if="show">
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
                        <div class="buttons-add-cancel-container">
                            <b-button
                                class="button-add"
                                v-if="show"
                                @click="addItem()"
                                style="padding: 6px 8px; border-radius: 10px"
                            >
                                <b-icon-check-lg />
                            </b-button>
                            <b-button
                                class="button-cancel"
                                v-if="show"
                                @click="showOptionsAddItem()"
                                style="padding: 6px 8px; border-radius: 10px"
                            >
                                <b-icon-x-lg />
                            </b-button>
                        </div>
                    </div>

                    <b-button class="button-save" @click="makeSale()"
                        >Salvar alterações</b-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "SaleView",
    data() {
        return {
            show: false,
            codeProduct: null,
            codeSeller: null,
            quantity: null,
            stateCodeProduct: null,
            stateCodeSeller: null,
            stateQuantity: null,
            items: [],
        };
    },

    methods: {
        showOptionsAddItem: function () {
            return (this.show = !this.show);
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
        codeProductValidation: function () {
            return this.codeProduct > 0 || false;
        },
        codeSellerValidation: function () {
            return this.codeSeller > 0 || false;
        },
        quantityValidation: function () {
            return this.quantity > 0 || false;
        },
        itemsValidation: function () {
            return this.items.length > 0 || false;
        },
        addItem: function () {
            if (!this.codeProductValidation())
                return (this.stateCodeProduct = false);
            if (!this.codeSellerValidation())
                return (this.stateCodeSeller = false);
            if (!this.quantityValidation()) return (this.stateQuantity = false);
            this.$store.dispatch("isLoaded");
            axios
                .get(`/api/product/getById/${this.codeProduct}`)
                .then((response) => {
                    let value = this.quantity * response.data.value;
                    let descriptionProduct = response.data.description;
                    let supplierProduct = response.data.supplier.id;
                    let newProduct = {
                        quantity: this.quantity,
                        partialValue: value,
                        product: {
                            code: this.codeProduct,
                            description: descriptionProduct,
                            supplier: {
                                id: supplierProduct,
                            },
                        },
                    };
                    this.items.push(newProduct);
                    this.$store.dispatch("notIsLoaded");
                })
                .catch((error) => {
                    this.$store.dispatch("notIsLoaded");
                    this.openModal("Algo deu errado!", error, "danger");
                });
        },
        removeItem: function (index) {
            this.items.splice(index, 1);
        },
        makeSale: function () {
            if (!this.quantityValidation())
                return this.openModal(
                    "Carrinho vazio!",
                    "Adicione itens para realizar à venda",
                    "danger"
                );
            this.$store.dispatch("isLoaded");
            axios
                .post("/api/sale/add", { items: this.items })
                .then(() => {
                    this.$store.dispatch("notIsLoaded");
                    this.openModal("Sucesso!", "Venda realizada.", "success");
                })
                .catch((error) => {
                    this.$store.dispatch("notIsLoaded");
                    this.openModal("Algo deu errado!", error, "danger");
                });
        },
    },
    watch: {
        codeProduct: function () {
            this.stateCodeProduct = this.codeProductValidation();
        },
        codeSeller: function () {
            this.stateCodeSeller = this.codeSellerValidation();
        },
        quantity: function () {
            this.stateQuantity = this.quantityValidation();
        },
    },
};
</script>

<style scoped>
.sale-container {
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
.table-sale {
    border-radius: 5px;
    height: 242px;
    background-color: #555555;
}
.table-head,
.table-body {
    background-color: #555555;
    font-size: 16px;
    color: white;
    font-weight: 400;
    user-select: none;
}
.table-body {
    cursor: pointer;
    font-size: 14px;
}
.form-control {
    background-color: #555555;
    border: 0;
    border-bottom-style: solid;
    border-bottom-color: #555555;
    border-bottom-width: 2px;
    width: 100px;
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
.buttons-container {
    margin-top: auto;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}
.add-item-container {
    display: flex;
    gap: 15px;
    align-items: center;
}
.description {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 1.4px;
    color: #888888;
    text-align: start;
    margin-bottom: 5px;
}
.buttons-add-cancel-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.button-save,
.button-add,
.button-cancel {
    background: linear-gradient(0deg, #008f1f 0%, #69fe66 100%), #222222;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.15);
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 1.5px;
    padding: 15px 25px;
    border: 0;
    transition: 0.5s;
    max-height: 48px;
    margin-top: auto;
}
.button-add {
    background: linear-gradient(0deg, #b2b414 0%, #fefb66 100%), #222222;
    padding: 10px 20px;
    font-size: 11px;
    margin-top: 0;
}
.button-cancel {
    background: linear-gradient(0deg, #b41414 0%, #fe6666 100%), #222222;
}
.button-save:hover {
    background: linear-gradient(0deg, #01821d 0%, #6de66b 100%), #333333;
    transform: scale(1.05);
}
.button-add:hover {
    background: linear-gradient(0deg, #ada811 0%, #dee66b 100%), #333333;
    transform: scale(1.05);
}
.button-cancel:hover {
    background: linear-gradient(0deg, #ad1111 0%, #e66b6b 100%), #333333;
    transform: scale(1.05);
}
.invalid-message {
    font-size: 13px;
    font-weight: 300;
    text-align: start;
    margin-bottom: -25px;
}
</style>
