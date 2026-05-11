# Illness Narratives in Macedonian Literature — Archive Website
## README & Setup Guide

---

## FILES IN THIS PACKAGE

| File         | Purpose                                      |
|--------------|----------------------------------------------|
| index.html   | Homepage — hero, colour legend, archive cards |
| story.html   | Individual book/story entry page (template)  |
| about.html   | About the project, methodology, ethics        |
| style.css    | All shared styles for the entire website      |
| README.md    | This file                                     |

---

## HOW TO USE THIS WEBSITE

### 1. Open locally
Simply open `index.html` in any web browser. All pages link to each other.
No server or installation is needed for basic use.

### 2. To publish online
Upload all files to any web hosting service (e.g. GitHub Pages, Netlify, university server).
Keep all files in the same folder. Do not change file names unless you also update the links.

---

## HOW TO ADD BOOKS TO THE ARCHIVE

### Step 1 — Add a card on index.html
Copy this card template and paste it inside the `<div class="cards-grid">` section.
Replace all placeholder text with real data:

```html
<article class="book-card" data-type="TYPE" data-illness="ILLNESS-KEY">
  <div class="card-band" style="background: ILLNESS-COLOUR;"></div>
  <div class="card-cover" style="background: LIGHT-COLOUR;">
    <img src="covers/FILENAME.jpg" alt="Cover of BOOK TITLE">
    <!-- If no image: <p class="cover-placeholder">[ Cover ]<br>Narrative type</p> -->
  </div>
  <div class="card-body">
    <div class="card-tags">
      <span class="tag">TYPE LABEL</span>
      <span class="tag">VOICE LABEL</span>
    </div>
    <h3 class="card-title">BOOK TITLE IN MACEDONIAN</h3>
    <p class="card-author">Author Name · Year</p>
    <p class="card-desc">
      <span class="illness-dot" style="background: ILLNESS-COLOUR;"></span>ILLNESS NAME
      <br><br>Short description of the book — 2-3 sentences, humanly written.
    </p>
    <div class="card-footer">
      <span class="card-type-badge">TYPE LABEL</span>
      <a href="stories/SLUG.html" class="card-read-btn">Read more</a>
    </div>
  </div>
</article>
```

### data-type values (for filtering):
- `autobiography`
- `family`
- `fiction`
- `poetry`

### data-illness values (for colour-orb filtering):
- `childhood-cancer`
- `breast-cancer`
- `cancer`
- `mental-illness`
- `anxiety`
- `alzheimers`
- `leukemia`
- `chronic-pain`
- `grief`
- `rare`

---

## ILLNESS COLOURS REFERENCE

| Illness              | Hex Colour | Card bg tint |
|----------------------|------------|--------------|
| Childhood cancer     | #FFD700    | #FFFBE6      |
| Breast cancer        | #FF3DA0    | #FFF0F8      |
| Cancer (general)     | #b0b0b0    | #F5F5F5      |
| Mental illness       | #00C97A    | #E6FFF5      |
| Anxiety / PTSD       | #00B4D8    | #E6F8FF      |
| Alzheimer's          | #9B5FE3    | #F3EEFF      |
| Leukemia             | #FF6B35    | #FFF3EE      |
| Chronic pain         | #E8003A    | #FFF0F3      |
| Grief / Palliative   | #0094C6    | #E6F4FF      |
| Rare diseases        | zebra      | #F5F5F5      |

---

## HOW TO CREATE A STORY PAGE

1. Copy `story.html` and rename it (e.g. `stories/book-title.html`)
2. Replace all placeholder text with real data:
   - Story title, author, publisher, year, pages, ISBN
   - Description, curator's note, thematic keywords
   - Bibliographic data in the sidebar
   - Related stories
3. Update the illness colour bar background colour
4. Add the cover image (see cover images below)
5. Link to it from the card in index.html

---

## COVER IMAGES

- Create a folder called `covers/` inside the archive folder
- Place all cover images there (JPG or PNG)
- Recommended size: 400 × 560 pixels (portrait orientation)
- Name files clearly: e.g. `covers/author-title-2018.jpg`
- In the card and story page, use: `<img src="covers/FILENAME.jpg" alt="...">`

---

## FONTS
The website uses Google Fonts:
- Cormorant Garamond (headings, titles, quotes)
- Jost (body, labels, navigation)

These load automatically from Google's servers when online.
If using offline, download them from fonts.google.com and update the @import line in style.css.

---

## COLOURS & BRANDING

Main palette:
- Dark brown-black: `#1a1008`
- Warm cream (page bg): `#fff` / `#f5f0e8`
- Gold accent: `#ffe870`
- Parchment section bg: `#f5f0e8`

---

## ACADEMIC CITATION OF THE ARCHIVE

[Your Name]. *Illness Narratives in Macedonian Literature: First Archive and Bibliography*.
[City]: [Institution], [Year]. Available at: [Website URL].

---

## QUESTIONS?

Contact: [your@email.com]
