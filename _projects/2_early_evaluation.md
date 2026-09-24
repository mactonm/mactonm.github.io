---
layout: page
title: Can early evaluation predict deployment failure?
description: Studying whether failures detected during external validation, silent deployment, and human-factors evaluation explain downstream clinical performance.
img: assets/img/projects/selected_project_2_causal_attribution.png
importance: 3
category: research
label: Research question
---

Staged evaluation is only worthwhile if the early stages are informative. This project tests that assumption directly: do the failures we catch before deployment actually explain what goes wrong afterwards?

## Motivation

External validation, silent deployment, and human-factors studies each produce a different kind of signal. Little is known about which of these signals are predictive of real clinical outcomes, and which are noise that delays useful tools without protecting patients.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="Placeholder figure" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="Placeholder figure" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Placeholder figures. Replace with the failure taxonomy and an example calibration drift plot.
</div>

## Approach

We pair retrospective records of deployed clinical models with their pre-deployment evaluation artifacts, then use causal inference to estimate how much of the observed performance gap is attributable to failures that were detectable in each earlier stage.

## Status

Data partnerships in progress; analysis plan pre-registered.
