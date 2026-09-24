---
layout: page
title: Whose definition of harm does an AI safety benchmark measure?
description: Developing multilingual safety evaluations that account for linguistic and cultural variation in underrepresented communities.
img: assets/img/projects/selected_project_3_multilingual_safety.png
importance: 1
category: research
label: Research question
---

Safety benchmarks encode a definition of harm. When that definition is written in one language by one community and applied everywhere, models can pass the benchmark while failing the people who actually use them.

## Motivation

Most safety evaluations are authored in English and translated, if at all, after the fact. Translation preserves the words but not the context: what is harmful, offensive, or dangerous varies across languages and cultures, and low-resource language communities are rarely consulted.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="Placeholder figure" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Placeholder figure. Replace with a comparison of harm annotations across languages.
</div>

## Approach

We build safety evaluations from the ground up in underrepresented languages, with harm taxonomies grounded in community-defined policies rather than translated from English. We then measure how model safety rankings shift when the definition of harm changes.

## Status

Annotation guidelines in development with community partners.
