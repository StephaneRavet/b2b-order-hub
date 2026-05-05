#!/usr/bin/env bash
# Vérifie les 7 endpoints du B2B Order Hub avec les codes HTTP attendus.
# Prérequis : jq installé (brew install jq | apt install jq).

BASE="http://localhost:3000"
fail=0

check() {
  local code="$1"; local expected="$2"; local label="$3"
  if [ "$code" = "$expected" ]; then
    echo "  ✓ $label → $code"
  else
    echo "  ✖ $label attendu $expected, reçu $code"
    fail=1
  fi
}

# Login — récupérer un token pour les tests authentifiés
TOKEN=$(curl -s -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@equation.fr","password":"demo1234"}' | jq -r '.token // empty')

echo "Test des 7 endpoints…"

# 1. GET /api/products → 200
code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/products")
check "$code" 200 "GET  /api/products"

# 2. POST /api/auth/login (creds valides) → 200
code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@equation.fr","password":"demo1234"}')
check "$code" 200 "POST /api/auth/login (valides)"

# 3. POST /api/auth/login (creds invalides) → 401
code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"wrong@x.com","password":"wrongpassword"}')
check "$code" 401 "POST /api/auth/login (invalides)"

# 4. GET /api/auth/me (sans token) → 401
code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/auth/me")
check "$code" 401 "GET  /api/auth/me (sans token)"

# 5. GET /api/auth/me (avec token) → 200
code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/auth/me" \
  -H "Authorization: Bearer $TOKEN")
check "$code" 200 "GET  /api/auth/me (avec token)"

# 6. GET /api/orders → 200
code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/orders")
check "$code" 200 "GET  /api/orders"

# 7. GET /api/orders/:id (1er ID retourné par /api/orders) → 200
ID=$(curl -s "$BASE/api/orders" | jq -r '.items[0].id // empty')
if [ -n "$ID" ]; then
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/orders/$ID")
  check "$code" 200 "GET  /api/orders/$ID"
else
  echo "  ✖ GET /api/orders/:id  pas d'ID disponible dans /api/orders"
  fail=1
fi

# 8. GET /api/orders/99999 (inexistante) → 404
code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/orders/99999")
check "$code" 404 "GET  /api/orders/99999 (404)"

# 9. POST /api/orders (items vides) → 422
code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/orders" \
  -H "Content-Type: application/json" \
  -d '{"customerId":1,"items":[]}')
check "$code" 422 "POST /api/orders (items vides → 422)"

# 10. PATCH /api/orders/:id/status — 200 si transition valide, 422 sinon
if [ -n "$ID" ]; then
  code=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH "$BASE/api/orders/$ID/status" \
    -H "Content-Type: application/json" \
    -d '{"status":"paid"}')
  if [ "$code" = "200" ] || [ "$code" = "422" ]; then
    echo "  ✓ PATCH /api/orders/$ID/status → $code (200 si transition valide, 422 sinon)"
  else
    echo "  ✖ PATCH /api/orders/$ID/status attendu 200 ou 422, reçu $code"
    fail=1
  fi
fi

echo ""
[ $fail -eq 0 ] && echo "✅ success — les 7 endpoints répondent comme attendu" || echo "❌ failed — voir les ✖ ci-dessus"