<script>
import { ref, computed } from 'vue'

const items = ref([{ price: 10, qty: 2 }, { price: 5, qty: 3 }])

const total = computed(() =>
  items.value.reduce((acc, i) => acc + i.price * i.qty, 0)
)

console.log(total.value)  // 35, recalculé automatiquement quand items change
</script>