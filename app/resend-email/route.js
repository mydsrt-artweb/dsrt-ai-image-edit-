-    const res = await fetch("https://api.resend.com/emails", {
-      method: "POST",
-      headers: {
-        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
-        "Content-Type": "application/json"
-      },
-      body: JSON.stringify({
-        from: "noreply@" + (process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\\/\\//, "") || "example.com"),
-        to: [to],
-        subject,
-        html
-      })
-    })
+    const siteDomain = process.env.NEXT_PUBLIC_SITE_URL
+      ? process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, "")
+      : "example.com"
+
+    const res = await fetch("https://api.resend.com/emails", {
+      method: "POST",
+      headers: {
+        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
+        "Content-Type": "application/json"
+      },
+      body: JSON.stringify({
+        from: `noreply@${siteDomain}`,
+        to: [to],
+        subject,
+        html
+      })
+    })
