---
layout: page
permalink: /publications/
title: Publications
description:
hide_header: true
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<div class="homepage-sections internal-page publications-page">
  <section class="homepage-section homepage-section-plain selected-publications">
    <div class="homepage-section-heading">
      <h2>All publications</h2>
      <a href="{{ site.data.socials.scholar_userid | prepend: 'https://scholar.google.com/citations?user=' }}" target="_blank" rel="noopener noreferrer">Google Scholar <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="publications">
      {% bibliography %}
    </div>
  </section>
</div>
