<div align="center">

<img src="assets/hero.svg" width="100%" alt="Mochi, a tiny ginger pixel cat who lives in this README" title="psst... she's chasing the yarn again">

<br>
<br>

<img alt="lives: 9" src="https://img.shields.io/badge/lives-9-ff8752?style=for-the-badge">
<img alt="mood: zoomies" src="https://img.shields.io/badge/mood-zoomies-ff5d8f?style=for-the-badge">
<img alt="made of: pixels" src="https://img.shields.io/badge/made%20of-pixels-6b54b3?style=for-the-badge">
<img alt="javascript: none" src="https://img.shields.io/badge/javascript-none-3ccf6e?style=for-the-badge">

<h3><i>She runs. She sits. She naps. That's the whole job.</i></h3>

<a href="#-meet-mochi">Meet Mochi</a> ·
<a href="#-moves">Moves</a> ·
<a href="#-palette">Palette</a> ·
<a href="#-adopt-her">Adopt her</a> ·
<a href="#-how-shes-made">How she's made</a>

</div>

<br>

## 🐾 Meet Mochi

<img src="assets/card.svg" width="100%" alt="Mochi's character card: speed 17, naps max, curiosity 16, chaos 13, yarn love max" title="stats verified by Mochi">

Mochi is a ginger tabby, drawn one pixel at a time on a grid barely bigger than a postage stamp: her whole body fits in **23 × 13 pixels**. She has a four-frame gallop, a blink, a tail that won't sit still, and a ball of yarn she has never once caught.

> [!TIP]
> Watch the card for a few seconds. Her stats fill up segment by segment, her heart beats, and every so often she blinks at you.

<img src="assets/divider.svg" width="100%" alt="">

## 🎬 Moves

<img src="assets/moves.svg" width="100%" alt="Mochi's three moves: zoomies, sitting pretty, and cat naps">

<table>
<tr>
<td width="33%" valign="top" align="center">

**🏃 Zoomies**

<sub>A four-frame gallop: stretch, land, gather, push off. Her body bobs on the airborne frames.</sub>

</td>
<td width="33%" valign="top" align="center">

**🪑 Sit pretty**

<sub>Tail wrapped round her paws, tip flicking. Blinks every four seconds, give or take.</sub>

</td>
<td width="33%" valign="top" align="center">

**💤 Cat nap**

<sub>A loaf with her eyes shut. She breathes, and the Z's drift off to the right.</sub>

</td>
</tr>
</table>

## 🎨 Palette

<img src="assets/palette.svg" width="100%" alt="Mochi's palette: outline 2B1D33, fur F6A54B, shine FFC677, stripes D9722E, cream FFF3E0, nose FF6B8B, blush FFB0C0, yarn FF5D8F">

Seven colours for the cat, plus a white glint in each eye and pink for the yarn. The outline is a deep plum instead of black, so she stays soft against the night sky, and her stripes are just a darker orange laid over the fur.

<img src="assets/divider.svg" width="100%" alt="">

## 🧶 Adopt her

Every scene is a plain SVG file, so Mochi can move into any README. Copy the `assets` folder and drop her in:

```html
<img src="assets/divider.svg" width="100%" alt="">
```

| File | What it shows | Best for |
|:--|:--|:--|
| `assets/hero.svg` | Night sky, moon, fireflies, and Mochi chasing her yarn under a bouncing title | The top of a page |
| `assets/card.svg` | Her character card, with stat bars that fill and a blinking portrait | Showing off |
| `assets/moves.svg` | Zoomies, sitting pretty, and a cat nap, side by side | A gallery |
| `assets/palette.svg` | Her colours, with hex codes | Design notes |
| `assets/divider.svg` | Mochi running back and forth on a dotted line, turning round at the edge | Between sections |

> [!NOTE]
> The divider has a transparent background, so it works in light and dark themes. Everything else carries its own night sky.

## 🔧 How she's made

<details>
<summary><b>Drawn by hand, outlined by code</b></summary>
<br>

Each pose starts as a small text grid, one character per pixel:

```text
.............O.......O.     O  fur        E  eye
.O...........OP.....PO.     H  shine      W  eye glint
OO...........OHHHOOOOO.     D  stripes    P  nose, inner ear
OD..........OOOEWOOEWOO     L  cream      B  blush
OO..........OOOEEOOEEOO                   .  empty
.OO..HHHHHHHHOBLLPPLBOO
..OOOODOODOOOOLLLLLLO..
```

Only the inside of the cat is drawn. A script finds every empty pixel that touches her and paints it plum, so the outline always hugs the shape, even as her legs move. Legs are described by where each row of the leg sits, which makes a new frame a single line of numbers.

</details>

<details>
<summary><b>Animated with nothing but CSS</b></summary>
<br>

GitHub won't run JavaScript in a README, but it does show SVG images, and an SVG can carry its own `<style>`. Each frame of the gallop is a group of pixels, and a `step-end` keyframe shows one at a time:

```css
.f0, .f1, .f2, .f3 { animation: .42s step-end infinite }
@keyframes f0 { 0% { opacity: 1 } 25%, 100% { opacity: 0 } }
@keyframes f1 { 0% { opacity: 0 } 25% { opacity: 1 } 50%, 100% { opacity: 0 } }
```

A second animation slides the whole group across the scene. On the divider, a third one flips her with `scaleX(-1)` at the edge, so she turns round instead of moonwalking back.

</details>

<details>
<summary><b>Rebuild the scenes</b></summary>
<br>

The SVGs are generated. Change a pixel in `gen/cat.py` or `gen/poses.py`, then run:

```bash
python gen/build.py
```

| File | Holds |
|:--|:--|
| `gen/cat.py` | The running cat, her palette, and the automatic outline |
| `gen/poses.py` | Sitting and sleeping, built from the same head so she stays on model |
| `gen/px.py` | Pixel fonts, shapes, and the code that packs pixels into as few `<rect>`s as possible |
| `gen/build.py` | The scenes: sky, moon, hills, fireflies, and the CSS that makes them move |

</details>

<details>
<summary><b>😺 Fun facts</b></summary>
<br>

- Her eyes are 2 × 2 pixels, with one white pixel for the glint.
- The night sky is nine flat colour bands with a checkerboard row at each edge, the way old consoles faked gradients.
- In the banner she covers about one and a half body lengths a second, and her legs cycle a little over twice a second.
- The yarn rolls with her stride, and it's always one step ahead.

</details>

<br>

<img src="assets/divider.svg" width="100%" alt="">

<p align="center"><sub>Made with 🧡 and far too many tiny squares. No yarn was caught in the making of this README.</sub></p>
