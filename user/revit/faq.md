---
title: FAQ
---

# Frequently Asked Questions – Revit Connector

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on the V2 Revit connector.</span>
  <span class="next-gen">A Next Gen Revit connector is available with significant improvements. These FAQs refer to the legacy version only.</span>
</div>

> ⚠️ We recommend using the **Next Gen Revit connector** for the latest features and better compatibility.  
> You can download it from [**app.speckle.systems/downloads**](https://app.speckle.systems/downloads)

---

### 1. Can I upload my Revit files to Speckle?

No. Speckle does not support uploading `.rvt` files directly due to the proprietary nature of the format.  
To share Revit data on Speckle, use the Revit Connector to send structured geometry and metadata to your Speckle project.

---

### 2. Does the Revit Connector support materials/textures?

Yes, it supports **materials**.  
Texture support is limited in V2, but improvements are being introduced in the Next Gen version.

---

### 3. Can I send Linked Models from Revit?

Yes. You can enable **"Send Linked Models"** in the **Advanced Settings** panel within the connector UI.  
Linked models will be included in your send operation.

---

### 4. Does the Revit Connector support the Family Editor?

Yes, you can send and receive geometry from within the Family Editor.  
Some limitations apply — refer to the [Support Tables](/user/support-tables.html#revit) for full details.

---

### 5. Does the Revit Connector support Design Options?

Yes, design options are supported.  
Refer to our [Revit support docs](/user/revit) for more details and known caveats.

---

### 6. How do I install the Revit Connector for all users?

The V2 connector installed via Speckle Manager only applies to the **current user**.  
For system-wide deployment instructions, see [System-Wide Installations](/user/installing.html#system-wide-installations).

In the Next Gen version, connectors are installed independently per user. Admin deployments will be addressed in future releases.

---

### 7. How do I uninstall the Revit Connector?

#### If installed via Manager (V2 only):

1. Open **Manager**
2. Select **Revit Connector**
3. Click **Uninstall**

#### If installed manually or for Next Gen:

1. Go to **Add or Remove Programs** in Windows
2. Search for **Speckle for Revit**
3. Click the `...` menu next to it
4. Select **Uninstall**
