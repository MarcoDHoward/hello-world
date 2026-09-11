/*
 * MIRAGE — page logic.
 * Reads MIRAGE_EVENTS and MIRAGE_SERIES from data/events.js and fills the
 * "Next event" block and the "Past" flyer grid. No dependencies.
 */
(function () {
  "use strict";

  if (typeof MIRAGE_EVENTS === "undefined") return;

  /* ---- helpers ---------------------------------------------------------- */

  // Parse "YYYY-MM-DD" as a local date so it never shifts a day on time zones.
  function parseDate(iso) {
    var p = iso.split("-").map(Number);
    return new Date(p[0], p[1] - 1, p[2]);
  }

  function startOfToday() {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  var longDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
  });
  var shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (k === "class") node.className = attrs[k];
        else if (attrs[k] != null && attrs[k] !== false) node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function seriesInfo(key) {
    return (typeof MIRAGE_SERIES !== "undefined" && MIRAGE_SERIES[key]) || { name: key.toUpperCase() };
  }

  function metaItem(label, value) {
    return el("div", null, [
      el("dt", { class: "label", text: label }),
      el("dd", { text: value }),
    ]);
  }

  /* ---- split events ------------------------------------------------------ */

  var today = startOfToday();
  var events = MIRAGE_EVENTS.slice().map(function (e) {
    return Object.assign({}, e, { _date: parseDate(e.date) });
  });

  var upcoming = events
    .filter(function (e) { return e._date >= today; })
    .sort(function (a, b) { return a._date - b._date; });

  var past = events
    .filter(function (e) { return e._date < today; })
    .sort(function (a, b) { return b._date - a._date; });

  /* ---- next event -------------------------------------------------------- */

  var nextSection = document.getElementById("next");
  var nextRoot = document.getElementById("next-event");
  var heroCta = document.getElementById("hero-cta");
  var next = upcoming[0];

  if (nextRoot) {
    if (!next) {
      nextSection.classList.remove("theme-velvet", "theme-nocturne");
      nextRoot.className = "event event--empty";
      nextRoot.replaceChildren(
        el("p", { text: "Nothing on the calendar yet. Join the list and you will hear first." })
      );
      if (heroCta) {
        heroCta.textContent = "Mailing list";
        heroCta.setAttribute("href", "#list");
      }
    } else {
      var series = seriesInfo(next.series);
      nextSection.classList.add("theme-" + next.series);

      var main = el("div", { class: "event__main" }, [
        el("p", { class: "event__edition", text: next.edition || series.name }),
        el("p", { class: "event__date", text: longDate.format(next._date) }),
        el("h2", { class: "event__headliner", text: next.headliner }),
        next.support && next.support.length
          ? el("ul", { class: "event__support", "aria-label": "Support" },
              next.support.map(function (n) { return el("li", { text: n }); }))
          : null,
        series.tagline ? el("p", { class: "event__tagline", text: series.tagline }) : null,
      ]);

      var hours = [next.doors, next.close].filter(Boolean).join(" to ");
      var where = [next.venue, next.address].filter(Boolean).join(", ");

      var meta = el("dl", { class: "event__meta" }, [
        where ? metaItem("Venue", where) : null,
        hours ? metaItem("Hours", hours) : null,
        next.tickets
          ? el("div", { class: "event__cta" }, [
              el("dt", { class: "label", text: "Tickets" }),
              el("dd", null, [
                el("a", { class: "button", href: next.tickets, rel: "noopener", text: "Get tickets" }),
              ]),
            ])
          : null,
      ]);

      nextRoot.replaceChildren(main, meta);

      if (heroCta) {
        heroCta.textContent = series.name + " · " + shortDate.format(next._date);
        heroCta.setAttribute("aria-label", "Next event: " + series.name + ", " + longDate.format(next._date));
      }
    }
  }

  /* ---- past events ------------------------------------------------------- */

  var pastRoot = document.getElementById("past-events");
  var pastSection = document.getElementById("past");

  if (pastRoot) {
    if (!past.length) {
      if (pastSection) pastSection.hidden = true;
    } else {
      var items = past.slice(0, 8).map(function (e) {
        var series = seriesInfo(e.series);
        var caption = (e.edition || series.name) + ". " + e.headliner + ". " + longDate.format(e._date);
        var inner;

        if (e.flyer) {
          inner = el("img", {
            src: e.flyer,
            alt: e.flyerAlt || caption,
            loading: "lazy",
            decoding: "async",
          });
        } else {
          inner = el("div", { class: "flyer__tile theme-" + e.series, role: "img", "aria-label": caption }, [
            el("span", { class: "label", text: e.edition || series.name }),
            el("span", { class: "flyer__headliner", text: e.headliner }),
            el("span", { class: "flyer__date", text: longDate.format(e._date) }),
          ]);
        }

        return el("li", { class: "flyer" }, [inner]);
      });

      pastRoot.replaceChildren.apply(pastRoot, items);
    }
  }
})();
