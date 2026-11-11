# Clubs index

Read this file first. Find the venue below, then open only that
venue's file. Don't read the other club files.

## Venues

| Venue | Also called | Series | City | File |
|---|---|---|---|---|
| Monkey Loft | ML, the Loft, WithinSodo building | Oasis | Seattle (SoDo) | [monkey-loft-handbook.md](monkey-loft-handbook.md) |
| The Revelry Room | Revelry | Velvet | | No file yet |

If the venue isn't listed, there's no file for it. Say so and ask for
the venue's details instead of guessing from another club's file.

## What to read in a club file

Each file has two parts:

- **Part 1, Booking form quick reference:** start here. It covers
  capacity, load-in, contacts, gear, rules, pre-sales, promo and money.
  Most tasks need only Part 1.
- **Part 2, Handbook (verbatim):** the venue's own wording. Open it
  only when Part 1 doesn't answer the question, or to check exact
  wording. If the two disagree, Part 2 wins.

Jump to the section the task needs:

| Task | Part 1 section |
|---|---|
| Artist booking form or advance | Venue, Rooms and capacity, Contacts, House DJ gear, Stage tech |
| Hospitality or green room rider | Hospitality and green room |
| Production rider, decor, visuals | Stage tech, Production rules |
| Pre-sale setup or event copy | Pre-sales (check the "Never say" row) |
| Flyers, posters, socials | Promotion deliverables |
| Budget, deal, settlement | Money and settlement |

## Adding a club

Handbooks are kept local only. `.gitignore` leaves out every
`Clubs/*-handbook.md`, because they hold venue contacts and deal terms
and the repo is public. Only this index is committed.

1. Name the file `<venue-name>-handbook.md` in lowercase with hyphens.
2. Use the same two parts and the same Part 1 section headings, so the
   task table above works for every venue.
3. Add a row to the Venues table, with any nicknames in "Also called".
