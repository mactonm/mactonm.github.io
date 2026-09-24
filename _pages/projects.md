---
layout: page
title: Projects
permalink: /projects/
description:
hide_header: true
nav: false
nav_order: 3
---

<div class="homepage-sections internal-page projects-page">
  <section class="homepage-section homepage-section-plain selected-projects" id="projects">
    <div class="homepage-section-heading">
      <h2>Projects</h2>
    </div>
    <div class="project-question-grid">
      {% assign sorted_projects = site.projects | sort: 'importance' %}
      {% for project in sorted_projects %}
        {% include projects.liquid %}
      {% endfor %}
    </div>
  </section>
</div>
