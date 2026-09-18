# MIRAGE — copy guide

Reference for writing any Mirage words: captions, stories, listings,
emails, site copy, flyer text, replies. Read this before writing.

Companion files: `brand.md` (facts, series, taglines), `DESIGN.md`
(how the words are set), `data/events.js` (the event fields every
template below draws from).

---

## 1. Voice in one paragraph

Few words. No hype. Invite, don't advertise. Mirage speaks like a
host at the door, not a promoter on a megaphone: it tells you what,
where and when, then steps back. Confidence comes from restraint. If
a line would work on any club's feed, cut it.

Underneath the restraint the voice is warm and a little playful. Mirage
is deep, melodic and fun, for people who listen. The rooms are dark and
the sound is deep, and the words have to make that feel sexy and
alluring rather than cold. The trick is the same one a good host uses:
closeness, not adjectives. "The room is small and the lights are low"
is alluring. "Sexy vibes" is not. The reader should feel let in, never
sold to.

The night has an arc, and the copy follows it. Velvet is the first half
of the record: trip hop and ambient into progressive, right up to the
edge of the dance floor. Nocturne is the second half: progressive into
techno, the floor locked in until 4. Write Velvet as an approach and
Nocturne as an arrival.

**Say:** "Velvet 005. The Revelry Room. Doors at 9."
**Never:** "Don't miss out!! Biggest night of the year 🔥"

---

## 2. Hard rules

These are not stylistic preferences. A copy skill should refuse to
produce text that breaks them.

- No exclamation points. Anywhere. Ever.
- No emoji, no emoticons, no decorative symbols. The middle dot (·),
  the en dash (–) and the full stop are the only separators.
- No hype vocabulary. See the word list in section 7.
- No urgency tactics: no "last chance", "hurry", "selling fast",
  "limited", "only a few left". If tickets are nearly gone, say
  "Nearly gone." once, plainly.
- No superlatives about ourselves: never "best", "biggest", "legendary",
  "iconic", "unmissable".
- No questions to the reader ("Ready?", "Who's coming?").
- No hashtags inside body copy. Up to three in a first comment on
  Instagram if wanted; none anywhere else.
- No ellipses, no ALL CAPS for emphasis in prose (caps are a
  typographic treatment applied by design, not by the writer).
- No "we're excited", "we're thrilled", "we can't wait". State the
  thing. The excitement is implied by the fact that we're doing it.
- Never use the words "sexy", "sultry", "seductive" or "steamy". The
  copy earns those; it doesn't claim them.
- Never name other brands, mixes or compilations as a comparison in
  public copy. "Like disc one of a mix" is an internal note, not a
  caption.
- Never invent facts. A missing date, price or name is written as a
  bracketed placeholder, `[DATE]`, for a person to fill.

---

## 3. Names, casing and formats

| Thing | Write it as | Notes |
|---|---|---|
| The brand | Mirage | Title case in prose. MIRAGE only as the wordmark or a label, set by design. |
| The series | Velvet, Nocturne | Title case in prose. Never "Velvet night" or "Nocturne party". |
| An edition | Velvet 005, Nocturne 004 | Series name, space, three digits. Numbering is per series. |
| The parent + series | Mirage presents Velvet | Only when the parent needs naming. Usually just "Velvet". |
| Velvet venue | The Revelry Room | Always with "The". |
| Nocturne venue | Monkey Loft | No "The". |
| City | Seattle | Never "the PNW", "the 206", "Sea-town". |
| Sound | Melodic techno and progressive house | The one-liner. See below for per-series sound lines. |
| Velvet sound | Trip hop into progressive | "into" describes the arc of the night. |
| Nocturne sound | Progressive into techno | Same. |
| Sound tags | Trip hop · Progressive | Middle dot, Title case, for flyers and footers. |
| Taglines | Come in closer. / Into the night. | Always with the full stop. Never altered, never merged. |
| Hours, display | 9:00PM – 1:00AM | En dash with spaces, no space before AM/PM. |
| Hours, prose | Doors at 9. Until 1. | Numbers alone when the hour is on the hour. "Doors at 9:30." otherwise. |
| Date, prose | Saturday, November 7 | Day name, comma, month, numeral. No ordinal ("7th"). Add the year only when it isn't this year. |
| Date, short slots | Nov 7 | Three-letter month, numeral. |
| Age | 21+ | Digits and plus. |
| Tickets | Tickets are up. / Tickets at the door. | Never "cop", "grab", "snag", "secure". |
| Artists | Exactly as the artist styles their name | Check the RA or label page. Label credits in parentheses after the name on flyers only. |
| Residents | Mirage residents | Lower-case "residents". Named where space allows. |

Line structure. Mirage's signature sentence is a run of short
fragments separated by full stops, in this order: what, where, when.

> Nocturne 004. Monkey Loft. Doors at 10.

Everything else follows that line, never precedes it.

---

## 4. Templates by format

Placeholders in `{{ }}` map to fields in `data/events.js` and
`brand.md`. `{{ series.name }}` is Title case here (Velvet), whatever
the data file holds. Optional lines are marked; drop them if the field
is empty, never leave a placeholder in shipped copy.

### 4.1 Instagram post, announcement

The first line is all that shows before "more". Make it the signature
line.

```
{{ edition }}. {{ venue }}. Doors at {{ doors }}.

{{ headliner }}
{{ support, one per line }}
{{ opener }}

{{ series.tagline }}

Tickets are up. Link in bio.        ← only if tickets is set
21+
```

Nothing else. No paragraph of scene-setting. If a single line about
the headliner is essential, it goes between the lineup and the
tagline, and it is a fact, not praise: "First Seattle date." or
"Three hours, open to close."

### 4.2 Instagram post, day of

```
Tonight. {{ venue }}. Doors at {{ doors }}.
{{ headliner }} from {{ headliner set time }}.   ← optional
Tickets at the door.                              ← or "Sold out. Thank you."
```

### 4.3 Instagram post, after

```
{{ edition }}. Thank you.
Next one: {{ next edition }}, {{ next date short }}.   ← optional
```

Photo posts after the night carry at most one line. The room speaks.

### 4.4 Instagram story text

One line, or two at most. Stories are glanced at.

```
{{ edition }} · {{ date short }}
```
```
Tonight. Doors at {{ doors }}.
```
```
Nearly gone.
```

### 4.5 Resident Advisor listing

**Title:** `Mirage presents {{ edition }}: {{ headliner }}`
(RA titles are searched, so the parent brand is named here.)

**Description:**

```
{{ series.name }} is Mirage's {{ series description }}.
{{ series.sound }}. {{ doors }} to {{ close }} at {{ venue }}, Seattle.

{{ headliner }} {{ one factual sentence about them, optional }}
With {{ support, joined by " and " }}. {{ opener }} opens.

{{ series.tagline }}

21+. {{ accessibility or entry note, optional }}
```

Series descriptions for the first line:
- Velvet: "Mirage's speakeasy series. Trip hop and ambient into
  progressive, in a small room, right up to the edge of the floor."
- Nocturne: "Mirage's late series. Progressive into techno, deep,
  until 4. The floor stays locked in."

### 4.6 Mailing list email

Subject line, 40 characters or fewer, no punctuation at the end:

```
{{ edition }} · {{ date short }}
```
or, for a lineup reveal:
```
{{ headliner }} at {{ venue }}
```

Body:

```
{{ edition }}. {{ venue }}. {{ date prose }}. Doors at {{ doors }}.

{{ headliner }}
{{ support, one per line }}
{{ opener }}

{{ series.tagline }}

Tickets                       ← a single link, the word alone
```

Sign-off is the wordmark, set by the template, not a "Cheers, the
Mirage team". One email per event, plus one the week of if tickets
remain. Never a "reminder" subject line; the second email leads with
"This Saturday."

### 4.7 Website

Section labels are single words or two, in the label style: Next
event, Two series, Listen, Past, Mailing list.

Support lines under labels are one short sentence each:
- Listen: "What we play."
- Mailing list: "Dates first. Nothing else."
- Empty next-event state: "Nothing on the calendar yet. Join the
  list and you will hear first."

Buttons are two or three words, verb first, no "now":
"Get tickets", "Open in Spotify", "Join". Never "Buy now", "Sign up
today", "Learn more".

### 4.8 Flyer

The flyer is design-led; copy supplies fields, not sentences.
Provide, in this order, and nothing more:

1. Month word and day numeral
2. Venue and hours
3. Series name
4. Headliner, as styled
5. Label credits, in parentheses, joined by middle dots (optional)
6. Support acts, up to two
7. Opener (optional)
8. Sound tags, joined by a middle dot

Never add a tagline, a price, a URL or a hashtag to a flyer.

### 4.9 Print collateral at the venue

Table tents, posters in the room, anything guests read in the dark:
the brand, the series, the tagline, and one way to follow. Nothing
about the night itself.

```
MIRAGE
Velvet
Come in closer.
@mirage.seattle
```

Pieces that leave the venue (door hangers, cards left on a bar) may
add one way to listen, and one offer if there is one. An offer is the
number and how to use it, nothing else:

```
10% off
At the door. Bring this.
```

Never "exclusive", "VIP", "limited", or an expiry in the copy. If an
offer needs conditions, they go on the back, in one line, in the label
size.

### 4.10 Replies and messages

Reply like a person, briefly, without the brand voice getting stiff.
Answer the question first. Thank people for coming without gushing.
Never argue in public; move a complaint to a message with "Sending you
a message." Never comment on other promoters or venues.

- "Doors at 9. See you there."
- "Sold out. We kept a few for the door, first come."
- "Thank you for coming."
- "Not this one. Next Velvet is in [MONTH]."

### 4.11 Artist announcements and bios

Facts only, in one or two sentences: where they are from, what they
release on, what they are known for playing. No adjectives about
quality. The artist's own bio is not to be pasted; rewrite it in the
Mirage register.

> "Berlin. Releases on Afterlife and Innervisions. Three-hour sets,
> progressive into techno."

---

## 5. Worked examples

**Announcement, Velvet**

```
Velvet 005. The Revelry Room. Doors at 9.

Headliner Name
Support One
Marco Valencia
Opener

Come in closer.

Tickets are up. Link in bio.
21+
```

**Announcement, Nocturne**

```
Nocturne 004. Monkey Loft. Doors at 10.

Headliner Name
Support One
Marco Valencia
Opener

Into the night.

Tickets are up. Link in bio.
21+
```

**Before and after**

| Before | After |
|---|---|
| "We are SO excited to announce our next event!!! 🎉" | "Velvet 005. The Revelry Room. Doors at 9." |
| "Don't miss the biggest night of the season, tickets selling fast!" | "Nearly gone." |
| "Get ready for an unforgettable journey into sound 🌙" | "Into the night." |
| "Huge thanks to everyone who came out last night, you were amazing!" | "Velvet 004. Thank you." |
| "Grab your tickets now via the link in our bio 🔗" | "Tickets are up. Link in bio." |
| "Doors open at 9:00 PM sharp!" | "Doors at 9." |

---

## 6. Length limits

| Format | Limit |
|---|---|
| Instagram first line | 60 characters, so it never truncates |
| Instagram caption, whole | 12 lines |
| Story text | 2 lines |
| Email subject | 40 characters |
| Email body | 14 lines |
| RA description | 3 short paragraphs |
| Site support line | 1 sentence, 8 words |
| Button | 3 words |
| Reply | 2 sentences |

---

## 7. Word list

**Never use:** amazing, awesome, banger, bangers, blessed, crazy,
don't miss, epic, excited, fire, get ready, grab, hurry, huge, hype,
iconic, insane, journey, last chance, legendary, lit, massive, party,
rager, ready?, secure your, selling fast, snag, stacked, thrilled,
turn up, unforgettable, unmissable, vibes, wild, you don't want to
miss.

**Use sparingly, once per piece at most:** small room, late, until
close, first Seattle date, all night, open to close.

**Preferred verbs:** doors at, tickets are up, opens, plays, from
(for set times), see you there.

**Words that carry the brand:** closer, night, room, late, low, deep,
warm, slow, locked in, reflection, shimmer, water, still. Use them
where they are true, not as garnish.

**Velvet words:** close, warm, slow, low light, the edge of the floor,
listen, lean in.
**Nocturne words:** deep, dark, locked in, until 4, long, the floor,
no clocks.

**Warmth without hype.** The draft can read cold if every line is a
timetable. Let one line per piece be human: "the record you'll ask
about", "stay for the last hour", "the lights go down at 9". One is
enough. Two is a mood board.

---

## 8. Checklist before publishing any copy

- [ ] The signature line is present and first: what, where, when
- [ ] No exclamation points, emoji, hashtags in body, ellipses
- [ ] No words from the never-use list
- [ ] No questions to the reader, no urgency tactics
- [ ] Names, venues, hours and dates in the formats in section 3
- [ ] Artist names spelled as the artist styles them
- [ ] Tagline is verbatim, with its full stop, and used at most once
- [ ] No placeholder left unfilled
- [ ] Within the length limit for the format
- [ ] Read aloud once: does it sound like a host, not a promoter?
