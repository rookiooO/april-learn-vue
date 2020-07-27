function isNumber(val) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(val + '')
}
Vue.component('input-number', {
    template: '\
    <div class="input-number">\
    <input type="text" :value="currentValue" @input="handleInput" @keypress="handleKeyPress"></input>\
    <button @click="handleReduce" :disabled="currentValue <= min">-</button>\
    <button @click="handleAdd" :disabled="currentValue >= max">+</button>\
    </div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        step: {
            type: Number,
            default: 10
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        value(val) {
            this.updateValue(val)
        },
        currentValue(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        handleReduce() {
            if (this.currentValue <= this.min)
                return
            this.currentValue-=this.step
        },
        handleAdd() {
            if (this.currentValue >= this.max)
                return
            this.currentValue+=this.step
        },
        handleInput(event) {
            var val = event.target.value.trim()
            if (isNumber(val)) {
                val = Number(val)
                this.currentValue = val
                if (val > max) {
                    this.currentValue = this.max
                } else if (val < min) {
                    this.currentValue = this.min
                } else {
                    this.currentValue = val
                }
            }

        },
        updateValue(val) {
            if (val > this.max) val = this.max
            if (val < this.min) val = this.min
            this.currentValue = val
        },
        handleKeyPress(event) {
            switch (event.key) {
                case '+':
                    this.handleAdd()
                    event.preventDefault()
                    break
                case '-':
                    this.handleReduce()
                    event.preventDefault()
                    break
                default:
                    break
            }
        }
    },
    mounted() {
        this.updateValue(this.value)
    }
})