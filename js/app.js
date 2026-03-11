/* ============================================================
   Gift Card Personalizer — Application Logic
   ============================================================ */

(function () {
  "use strict";

  /* --- State --- */
  let selectedCard = null;
  var canvasW = 800;
  var canvasH = 500;
  var imageCache = {};

  /* --- DOM References --- */
  const gridEl = document.getElementById("cardGrid");
  const canvasEl = document.getElementById("previewCanvas");
  const ctx = canvasEl.getContext("2d");
  const nameInput = document.getElementById("nameInput");
  const printBtn = document.getElementById("printBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  /* --- Initialise --- */
  function init() {
    canvasEl.width = canvasW;
    canvasEl.height = canvasH;

    preloadImages(function () {
      renderThumbnails();
      selectCard(CARD_LIBRARY[0]);
    });

    nameInput.addEventListener("input", renderPreview);
    printBtn.addEventListener("click", handlePrint);
    downloadBtn.addEventListener("click", handleDownload);
  }

  /* --- Preload card images --- */
  function preloadImages(callback) {
    var imagesToLoad = CARD_LIBRARY.filter(function (c) { return c.image; });
    var remaining = imagesToLoad.length;

    if (remaining === 0) { callback(); return; }

    imagesToLoad.forEach(function (card) {
      var img = new Image();
      img.onload = img.onerror = function () {
        imageCache[card.id] = img;
        remaining--;
        if (remaining === 0) callback();
      };
      img.src = card.image;
    });
  }

  /* --- Render Thumbnail Grid --- */
  function renderThumbnails() {
    gridEl.innerHTML = "";

    CARD_LIBRARY.forEach(function (card) {
      var thumb = document.createElement("div");
      thumb.className = "card-thumb";
      thumb.dataset.id = card.id;
      thumb.setAttribute("role", "button");
      thumb.setAttribute("tabindex", "0");
      thumb.setAttribute("aria-label", "Select " + card.label + " card");

      var bgStyle = card.image
        ? "background: url('" + card.image + "') center/cover no-repeat"
        : "background: " + card.gradient;

      thumb.innerHTML =
        '<div class="card-thumb-bg" style="' + bgStyle + '"></div>' +
        '<span class="card-thumb-label">' +
        card.label +
        "</span>";

      thumb.addEventListener("click", function () {
        selectCard(card);
      });

      thumb.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectCard(card);
        }
      });

      gridEl.appendChild(thumb);
    });
  }

  /* --- Select a Card --- */
  function selectCard(card) {
    selectedCard = card;

    var thumbs = gridEl.querySelectorAll(".card-thumb");
    thumbs.forEach(function (el) {
      el.classList.toggle("selected", el.dataset.id === card.id);
    });

    renderPreview();
  }

  /* --- Resize canvas to match card dimensions --- */
  function resizeCanvas(card) {
    var img = imageCache[card.id];
    if (card.image && img && img.naturalWidth) {
      canvasW = img.naturalWidth;
      canvasH = img.naturalHeight;
    } else {
      canvasW = 800;
      canvasH = 500;
    }
    canvasEl.width = canvasW;
    canvasEl.height = canvasH;
  }

  /* --- Render Canvas Preview --- */
  function renderPreview() {
    if (!selectedCard) return;

    resizeCanvas(selectedCard);

    /* Draw background: image or gradient */
    if (selectedCard.image && imageCache[selectedCard.id]) {
      drawImage(imageCache[selectedCard.id]);
    } else if (selectedCard.gradient) {
      drawGradient(selectedCard.gradient);
      drawDecorations();
      drawTitle();
    }

    /* Draw name text */
    var name = nameInput.value.trim() || "Your Name";
    var t = selectedCard.text;

    ctx.save();
    ctx.font = t.fontSize + "px " + t.fontFamily;
    ctx.fillStyle = t.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;
    ctx.fillText(name, canvasW * t.x, canvasH * t.y);
    ctx.restore();
  }

  /* --- Draw image at native size (canvas already matches) --- */
  function drawImage(img) {
    ctx.drawImage(img, 0, 0, canvasW, canvasH);
  }

  /* --- Parse CSS gradient and draw on canvas --- */
  function drawGradient(gradientCSS) {
    var angleMatch = gradientCSS.match(/([\d.]+)deg/);
    var angle = angleMatch ? parseFloat(angleMatch[1]) : 135;

    var colorStops = [];
    var colorRegex =
      /(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))\s*([\d.]+%)?/g;
    var match;
    while ((match = colorRegex.exec(gradientCSS)) !== null) {
      colorStops.push({
        color: match[1],
        stop: match[2] ? parseFloat(match[2]) / 100 : null,
      });
    }

    /* Assign default stops if missing */
    for (var i = 0; i < colorStops.length; i++) {
      if (colorStops[i].stop === null) {
        colorStops[i].stop =
          colorStops.length > 1 ? i / (colorStops.length - 1) : 0;
      }
    }

    /* Convert angle to start/end coordinates */
    var rad = ((angle - 90) * Math.PI) / 180;
    var cx = canvasW / 2;
    var cy = canvasH / 2;
    var len = Math.max(canvasW, canvasH);
    var x0 = cx - Math.cos(rad) * len;
    var y0 = cy - Math.sin(rad) * len;
    var x1 = cx + Math.cos(rad) * len;
    var y1 = cy + Math.sin(rad) * len;

    var grad = ctx.createLinearGradient(x0, y0, x1, y1);
    colorStops.forEach(function (s) {
      grad.addColorStop(s.stop, s.color);
    });

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasW, canvasH);
  }

  /* --- Decorative elements on the card --- */
  function drawDecorations() {
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = "#ffffff";

    /* Top-right circle */
    ctx.beginPath();
    ctx.arc(canvasW - 60, 60, 120, 0, Math.PI * 2);
    ctx.fill();

    /* Bottom-left circle */
    ctx.beginPath();
    ctx.arc(80, canvasH - 40, 80, 0, Math.PI * 2);
    ctx.fill();

    /* Subtle line accents */
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, canvasH * 0.45);
    ctx.lineTo(canvasW - 40, canvasH * 0.45);
    ctx.stroke();

    ctx.restore();
  }

  /* --- Draw "GIFT CARD" title --- */
  function drawTitle() {
    ctx.save();
    ctx.font = "600 22px 'Segoe UI', system-ui, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "4px";
    ctx.fillText("GIFT CARD", canvasW / 2, canvasH * 0.3);
    ctx.restore();
  }

  /* --- Print Handler --- */
  function handlePrint() {
    window.print();
  }

  /* --- Download as PNG --- */
  function handleDownload() {
    var link = document.createElement("a");
    var name = nameInput.value.trim() || "gift-card";
    var safeName = name.replace(/[^a-zA-Z0-9\u0600-\u06FF ]/g, "").replace(/\s+/g, "-");
    link.download = safeName + "-gift-card.png";
    link.href = canvasEl.toDataURL("image/png");
    link.click();
  }

  /* --- Boot --- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
