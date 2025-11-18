This file explains the SVG specifications and clarifies where each asset applies (Hero, ImageContent, or Testimonial sections).

---

````markdown
# 🍋 SVG Positioning & Styling Specifications

This document defines **SVG (image) styling** specifications for a web layout.  
Each SVG asset is associated with one of the following layout sections:
- **Hero Section**
- **ImageContent Section**
- **Testimonial Section**

All positioning values are **absolute**, and background images reference existing `.svg` assets.  
Only apply these styles within their respective designated sections.

---

## 🟢 HERO SECTION

### Mango (Hero)
```css
position: absolute;
width: 208.39px;
height: 260.48px;
left: 136px;
top: -86px;

background: url(Mango.svg);
border-radius: 160.013px;
transform: rotate(14.62deg);
````

### Bignay (Hero)

```css
position: absolute;
width: 219.17px;
height: 313.77px;
left: 852px;
top: -51px;

background: url(Bignay.svg);
```

### Dragonfruit (Hero)

```css
position: absolute;
width: 215.41px;
height: 338.24px;
left: -109.75px;
top: 311.54px;

background: url(dragonfruit.svg);
transform: matrix(-0.95, -0.32, -0.32, 0.95, 0, 0);
```

### Mangosteen (Hero)

```css
position: absolute;
left: 86.33%;
right: -8.49%;
top: 9.51%;
bottom: 82.71%;

background: url(.svg);
```

### Mulberry (Hero)

```css
position: absolute;
width: 210.75px;
height: 262.12px;
left: 1076px;
top: 88px;

background: url(Mulberry.svg);
transform: rotate(7.79deg);
```

### Calamansi (Hero)

```css
position: absolute;
left: -7.15%;
right: 91.1%;
top: 1.12%;
bottom: 92.97%;

background: url(calamansi.svg);
transform: matrix(0.46, -0.89, -0.89, -0.46, 0, 0);
```

---

## 🟠 IMAGECONTENT SECTION

### Calamansi (ImageContent 2)

```css
position: absolute;
width: 268.33px;
height: 335.41px;
left: 93.82px;
top: 1224.91px;

background: url(Calamansi.svg);
transform: rotate(-128.18deg);
```

### Mango (ImageContent)

```css
position: absolute;
width: 264.68px;
height: 330.85px;
left: 385.88px;
top: 1626.72px;

background: url(Mango.svg);
transform: rotate(-29.31deg);
```

### Mangosteen (ImageContent 1)

```css
position: absolute;
width: 252.98px;
height: 320.57px;
left: 224.8px;
top: 2074.55px;

background: url(mangosteen.svg);
```

### Bignay (ImageContent 1)

```css
position: absolute;
width: 259.92px;
height: 372.12px;
left: 888.59px;
top: 1270.93px;

background: url(Bignay.svg);
```

### Mulberry (ImageContent 1)

```css
position: absolute;
width: 219.31px;
height: 277.9px;
left: 1037.28px;
top: 1688.67px;

background: url(Mulberry.svg);
transform: rotate(20.01deg);
```

### Calamansi (ImageContent 1)

```css
position: absolute;
width: 268.33px;
height: 335.41px;
left: 821.32px;
top: 2014.37px;

background: url(Calamansi.svg);
transform: rotate(29.33deg);
```

### Dragonfruit (ImageContent 1)

```css
position: absolute;
width: 276.51px;
height: 395.96px;
left: -95.96px;
top: 1658.58px;

background: url(dragonfruit.svg);
transform: matrix(-1, 0, 0, 1, 0, 0);
```

---

## 🔵 TESTIMONIAL SECTION

### Calamansi (Testimonial 1)

```css
position: absolute;
width: 402.5px;
height: 503.13px;
left: -31.86px;
top: 3276.45px;

background: url(Calamansi.svg);
transform: rotate(2.03deg);
```

### Calamansi (Testimonial 2)

```css
position: absolute;
width: 448.2px;
height: 560.25px;
left: 943.46px;
top: 3099.44px;

background: url(Calamansi.svg);
transform: matrix(-1, 0.04, 0.04, 1, 0, 0);
```

### Calamansi (Testimonial 3)

```css
position: absolute;
width: 420.28px;
height: 525.36px;
left: 523.95px;
top: 3265.83px;

background: url(Calamansi.svg);
transform: rotate(-48.45deg);
```

### Calamansi (Testimonial 4)

```css
position: absolute;
width: 424.24px;
height: 530.3px;
left: 823.09px;
top: 2833.92px;

background: url(Calamansi.svg);
transform: rotate(2.03deg);
```

### Calamansi (Testimonial 5)

```css
position: absolute;
width: 335.72px;
height: 419.65px;
left: 3.54px;
top: 2968.45px;

background: url(Calamansi.svg);
transform: matrix(-1, 0.04, 0.04, 1, 0, 0);
```

### Calamansi (Testimonial 6)

```css
position: absolute;
width: 289.12px;
height: 361.4px;
left: 283.95px;
top: 3338.06px;

background: url(Calamansi.svg);
transform: rotate(2.03deg);
```

---

### 📄 Notes

* All measurements are in **pixels (px)** unless percentages are specified.
* Rotation and matrix transforms should remain exactly as defined.
* Ensure image assets are available in the same directory as the stylesheet or adjust the `url()` path accordingly.
* Only apply these styles to their **designated sections**.
* all measurements are relative to a frame with width: 1230.22px and 
height: 4096px
* calamansi_testimonial_1 and calamansi_testimonial_2 have a higher z-index than testimonial-content.

---

**Author:** Design Specification for SVG Layout
**Usage:** Front-end implementation guide for Hero, ImageContent, and Testimonial visual layers.

```

