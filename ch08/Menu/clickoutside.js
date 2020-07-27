Vue.directive('clickoutside', {
    bind: function(el, binding, vnode) {
        function documentHander(e) {
            if(el.contains(e.target)) {
                return false
            } 
            if(binding.expression) {
                binding.value(e)
            }
        }
        el.__vueClickOutside__=documentHander
        document.addEventListener('click', documentHander)
    },
    unbind:function(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
    }
})