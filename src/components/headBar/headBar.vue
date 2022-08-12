<template>
    <div class="headBar">
        <b-navbar toggleable="lg" type="dark" variant="light">
            <b-navbar-brand to="/" exact>
                Welcome to secondhand website
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav v-show="userInfo.username == null">
                    <b-nav-item :to="{ path: '/login?', query: { activeName: 'first' } }">login</b-nav-item>
                    <b-nav-item :to="{ path: '/login?', query: { activeName: 'second' } }">register</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>

                        <!-- <el-input size="mini" style="width:180px;" class="mr-sm-2" placeholder="commodity/seller" v-model="searchForm.searchText" @focus="focus()" @blur="blur()"></el-input> -->
                        <el-autocomplete size="mini" class="mr-sm-2" v-model="searchForm.searchText"
                            :fetch-suggestions="querySearch" placeholder="commodity/seller"
                            @select="autocompleteSelect">
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.title }}</div>
                            </template>
                        </el-autocomplete>
                        <b-button size="sm" class="my-2 my-sm-0" aria-label="search" type="submit" @click="search">
                            Search</b-button>
                        <b-button v-show="userInfo.username != null" size="sm" class="my-2 my-sm-0" variant="danger"
                            style="margin-left: 5px;" @click="openSell">I want to sell</b-button>
                    </b-nav-form>



                    <b-nav-item-dropdown text="help" right>
                        <b-dropdown-item @click="contactCommand()">Contact customerservice</b-dropdown-item>
                        <b-dropdown-item @click="toDocumentation">Help documentation</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown right v-show="userInfo.username != null">
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item :to="{ path: '/personal', query: { activeName: 'first' } }">Personal Center
                        </b-dropdown-item>
                        <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <!--卖东西弹窗-->
        <el-dialog title="Selling goods" :visible.sync="data.sellVisible" width="50%" center>
            <el-form ref="form" :model="form" label-width="160px" :rules="formRules">
                <el-form-item label="Product picture" prop="goodsUrl">
                    <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
                        multiple :auto-upload="false" :show-file-list="false" accept="image/jpg,image/png"
                        list-type="picture" :before-upload="beforeUpload" :on-change="onChange"
                        :http-request="httpRequest" style="float: left">
                        <div>
                            <img v-show="data.imageUrl" :src="data.imageUrl" class="avatar" width="100" height="100" />
                        </div>
                        <el-button size="small" type="primary">Click upload</el-button>
                        <div slot="tip" class="el-upload__tip">
                            Only JPG / PNG files can be uploaded, and no more than 2m
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="Product Name" prop="goodsName">
                    <el-input v-model="form.goodsName"></el-input>
                </el-form-item>
                <el-form-item label="Place of transaction" prop="goodsAddress">
                    <el-input v-model="form.goodsAddress"></el-input>
                </el-form-item>
                <el-form-item label="Put price" prop="goodsPrice">
                    <el-input type="number" v-model="form.goodsPrice"></el-input>
                </el-form-item>
                <el-form-item label="Put out quantity" prop="goodsNum">
                    <el-input-number v-model="form.goodsNum" @change="handleChange" :min="1" :max="10" label="数量">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="Product introduction" prop="goodsContent">
                    <el-input v-model="form.goodsContent"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="data.sellVisible = false">Cancel</el-button>
                <el-button type="primary" @click="sell('form')">release</el-button>
            </span>
        </el-dialog>


        <!--联系客服-->
        <el-dialog title="feedback" :visible.sync="data.contactVisible" width="30%" center>
            <el-form :model="contactForm" ref="contactForm">
                <el-form-item>
                    <el-input type="textarea" v-model="contactForm.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="data.contactVisible = false">cancel</el-button>
                <el-button type="primary" @click="sendFeedback()">send out</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import auth from "../../assets/js/headBar";
export default {
    ...auth,
};
</script>

<style scoped src="../../assets/css/headBar.css">
</style>
