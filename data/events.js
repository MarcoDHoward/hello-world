/*
 * MIRAGE event data.
 *
 * Everything the site shows about events lives here. Add an object to
 * MIRAGE_EVENTS and the page updates itself: the earliest upcoming date
 * becomes "Next event" and anything in the past goes to the flyer grid.
 *
 * Field guide (see README.md for the full explanation):
 *   series    "velvet" | "nocturne"       picks the palette
 *   edition   "VELVET 004"                short edition name
 *   date      "YYYY-MM-DD"                local Seattle date
 *   doors     "9:00PM"  close "1:00AM"    display strings, no parsing
 *   venue     "Monkey Loft"
 *   address   "Seattle"                   optional
 *   headliner "Name"                      set in Archivo Black
 *   labels    ["Label", "Label"]          optional label credits under the headliner
 *   support   ["Name", "Name"]            optional, light Archivo, one per line
 *   opener    "Name"                      optional, sits below the support pair
 *   tickets   "https://..."               optional; hides button when empty
 *   flyer     "brandassets/flyers/x.jpg" optional; falls back to a tile
 *   flyerAlt  "Flyer text"                optional; describes the image
 */

const MIRAGE_SERIES = {
  velvet: {
    name: "VELVET",
    tagline: "Come in closer.",
    venue: "The Speakeasy",
    hours: "9:00PM – 1:00AM",
    sound: "Trip hop into progressive.",
    soundTags: ["Trip hop", "Progressive"],
  },
  nocturne: {
    name: "NOCTURNE",
    tagline: "Into the night.",
    venue: "Monkey Loft",
    hours: "10:00PM – 4:00AM",
    sound: "Progressive into techno.",
    soundTags: ["Progressive", "Techno"],
  },
};

const MIRAGE_EVENTS = [
  {
    series: "velvet",
    edition: "VELVET 005",
    date: "2026-11-07",
    doors: "9:00PM",
    close: "1:00AM",
    venue: "The Speakeasy",
    address: "Seattle",
    headliner: "Headliner Name",
    labels: ["Label", "Label", "Label"],
    support: ["Support One", "Marco Valencia"],
    opener: "Opener",
    tickets: "https://ra.co/events/0000000",
    flyer: "brandassets/flyers/velvet-flyer-template.jpg",
    flyerAlt: "VELVET flyer. November 7 at The Speakeasy, 9:00PM to 1:00AM. Headliner Name, Support One, Marco Valencia, Opener. Trip hop and progressive.",
  },
  {
    series: "nocturne",
    edition: "NOCTURNE 004",
    date: "2026-11-21",
    doors: "10:00PM",
    close: "4:00AM",
    venue: "Monkey Loft",
    address: "Seattle",
    headliner: "Headliner Name",
    labels: ["Label", "Label", "Label"],
    support: ["Support One", "Marco Valencia"],
    opener: "Opener",
    tickets: "",
    flyer: "brandassets/flyers/nocturne-flyer-template.jpg",
    flyerAlt: "NOCTURNE flyer. November 21 at Monkey Loft, 10:00PM to 4:00AM. Headliner Name, Support One, Marco Valencia, Opener. Progressive and techno.",
  },
  {
    series: "velvet",
    edition: "VELVET 004",
    date: "2026-08-15",
    doors: "9:00PM",
    close: "1:00AM",
    venue: "The Speakeasy",
    headliner: "Past headliner",
    support: ["Support act"],
    flyer: "",
  },
  {
    series: "nocturne",
    edition: "NOCTURNE 003",
    date: "2026-07-25",
    doors: "10:00PM",
    close: "4:00AM",
    venue: "Monkey Loft",
    headliner: "Past headliner",
    support: ["Support act"],
    flyer: "",
  },
  {
    series: "velvet",
    edition: "VELVET 003",
    date: "2026-06-20",
    doors: "9:00PM",
    close: "1:00AM",
    venue: "The Speakeasy",
    headliner: "Past headliner",
    flyer: "",
  },
  {
    series: "nocturne",
    edition: "NOCTURNE 002",
    date: "2026-05-23",
    doors: "10:00PM",
    close: "4:00AM",
    venue: "Monkey Loft",
    headliner: "Past headliner",
    flyer: "",
  },
  {
    series: "velvet",
    edition: "VELVET 002",
    date: "2026-04-18",
    doors: "9:00PM",
    close: "1:00AM",
    venue: "The Speakeasy",
    headliner: "Past headliner",
    flyer: "",
  },
  {
    series: "nocturne",
    edition: "NOCTURNE 001",
    date: "2026-03-21",
    doors: "10:00PM",
    close: "4:00AM",
    venue: "Monkey Loft",
    headliner: "Past headliner",
    flyer: "",
  },
];
