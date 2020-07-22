var app = new Vue({
    el: '#app',
    data: {
        list: [
            {
                name: '电子产品',
                produces: [
                    {
                        id: 1,
                        name: 'iPhone 7',
                        price: 6188,
                        isSelect: false,
                        count: 1
                    },
                    {
                        id: 2,
                        name: 'iPad Pro',
                        price: 5888,
                        isSelect: true,
                        count: 1
                    },
                    {
                        id: 3,
                        name: 'MacBook Pro',
                        price: 21488,
                        isSelect: true,
                        count: 1
                    }]
            },
            {
                name: '生活用品',
                produces: [
                    {
                        id: 1,
                        name: '牙刷',
                        price: 6188,
                        isSelect: false,
                        count: 1
                    },
                    {
                        id: 2,
                        name: '脸盆',
                        price: 5888,
                        isSelect: true,
                        count: 1
                    }]
            },
            {
                name: '果蔬',
                produces: [
                    {
                        id: 1,
                        name: '苹果',
                        price: 6188,
                        isSelect: false,
                        count: 1
                    },
                    {
                        id: 2,
                        name: '香蕉',
                        price: 5888,
                        isSelect: true,
                        count: 1
                    }]
            }
        ]
    },
    computed: {
        totalPrice: function () {
            var prices = 0
            for (var i = 0; i < this.list.length; ++i) {
                for (var j = 0; j < this.list[i].produces.length; ++j) {
                    if (this.list[i].produces[j].isSelect) {
                        prices += this.list[i].produces[j].price * this.list[i].produces[j].count
                    }
                }
            }
            return prices.toString().replace(/\B(?=(\d{3})+$)/g, ',')
        }
    },
    methods: {
        handleReduce: function (i, j) {
            if (this.list[i].produces[j].count === 1)
                return
            this.list[i].produces[j].count--
        },
        handleAdd: function (i, j) {
            this.list[i].produces[j].count++
        },
        handleRemove: function (i, j) {
            this.list[i].produces.splice(j, 1)
        }

    }
})