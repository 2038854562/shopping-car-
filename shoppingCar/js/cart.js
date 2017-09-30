/**
 * jinz 2017/9/28
 */

 new Vue({
     el: "#app",
     data: {
        totalMoney:0,
        productList:[],
        checkAllFlag:false,
        showFlag:false,
        curProduct:''
     },
     filters: {
        formatMoney:function(value){
            return "￥ "+value.toFixed(2);
        }
     },
     mounted: function(){
        this.cartView();
     },
     methods: {
        cartView: function(){
            this.$http.get("data/cartData.json",{"id":123}).then(res => {
                this.productList = res.body.result.list;
            })
        },
        changeMount: function(item , key) {
            if(key>0){
                item.productQuantity++;
            }else{
                item.productQuantity-- ;
                if(item.productQuantity < 1) {
                    item.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct:function(item){
            if(typeof item.checked == 'undefined'){
                // Vue.set(item,"checked",true);
                this.$set(item,"checked",true);
            }else{
               item.checked = !item.checked;               
            }
            this.calcTotalPrice();
        },
        checkAll:function(falg){
            this.checkAllFlag = falg;
            var _this = this;
            this.productList.forEach(function(item,index) {
                if(typeof item.checked == 'undefined'){
                    // Vue.set(item,"checked",true);
                    _this.$set(item,"checked",_this.checkAllFlag);
                }else{
                   item.checked = _this.checkAllFlag;               
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice:function(){
            var _this = this;
            _this.totalMoney = 0;
            this.productList.forEach(function(item,index) {
               if(item.checked){
                    _this.totalMoney += item.productQuantity*item.productPrice;
               }
            });
        },
        delConfirm:function(item){
            this.showFlag = true;
            this.curProduct = item;
        },
        delProduct:function(){
            this.showFlag = false;
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
        }
     }

 })