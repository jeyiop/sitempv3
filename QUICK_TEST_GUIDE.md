# Quick Test Guide - Form Updates

## 🚀 Start Testing in 3 Steps

### 1. Start the Dev Server
```bash
npm run dev
```
Visit: `http://localhost:3001`

---

### 2. Test Contact Form (`/contact`)

**Quick Test Data:**
```
Prénom: Jean
Nom: Dupont
Email: test@example.com
Téléphone: 0612345678
Entreprise: (optional - can leave empty)
Message: This is a test message from the contact form
✓ Accept terms checkbox
```

**Expected Result:** ✅ Success message appears

---

### 3. Test Devis Form (`/devis`)

**Step 1 - Project:**
```
Type: PLV
Description: We need 50 display stands for our stores
```

**Step 2 - Specifications:**
```
Width: 100
Height: 200  
Depth: 30
Quantity: 50
```

**Step 3 - Timeline:**
```
Deadline: (pick any future date)
Budget: 10000-20000€
```

**Step 4 - Contact: ⭐ COMPANY NOW REQUIRED**
```
Prénom: Marie
Nom: Martin
Société: Test Company ← MUST FILL THIS
Email: marie@example.com
Téléphone: 0687654321
✓ Accept terms checkbox
```

**Expected Result:** ✅ Success message appears

---

## ⚠️ Test Required Fields

### Test 1: Devis Without Company
- Fill all fields in Step 4 EXCEPT "Société"
- Try to submit
- **Expected:** ❌ Error: "Nom de l'entreprise requis"

### Test 2: Contact Without Phone
- Fill all fields EXCEPT "Téléphone"
- Try to submit
- **Expected:** ❌ Error: "Téléphone requis"

---

## ✅ What Changed

### Contact Form
- ✅ Already had split names (firstName/lastName)
- ✅ Already had phone required
- ✅ Already had company field (optional)
- **No changes needed!**

### Devis Form
- ✅ Company field NOW REQUIRED (was optional)
- ✅ Shows error if empty
- ✅ Validation enforced on submit

---

## 🔍 Check Browser Console

Open DevTools (F12) → Console tab

**Look for:**
- ✅ `POST http://localhost:3000/api/v1/forms/contact` (status 200 or 201)
- ✅ `POST http://localhost:3000/api/v1/forms/devis` (status 200 or 201)

**If you see errors:**
- ❌ CORS error → Backend needs CORS enabled
- ❌ 404 error → Backend endpoint missing
- ❌ 400 error → Backend validation failed (check error message)

---

## 📋 Quick Checklist

- [ ] Dev server running (`npm run dev`)
- [ ] Contact form loads
- [ ] Contact form submits successfully
- [ ] Devis form loads
- [ ] Can navigate through all 4 steps
- [ ] Company field shows required asterisk (*)
- [ ] Cannot submit devis without company
- [ ] Devis form submits successfully
- [ ] Success messages appear

---

**Time Required:** 5 minutes  
**Status:** Ready to test! 🚀
