---
layout: post
title: Accessing Transformer Internal Representations
date: 2026-09-11 19:36:00+0000
description: A step-by-step guide to reading hidden states, attentions, and activations from transformer models.
tags: transformers pytorch interpretability
categories: tutorials
related_posts: false
---

If you want to inspect what a transformer is doing internally, the easiest starting point is
the Hugging Face + PyTorch stack. This guide walks through the setup, the forward pass, and
the most common ways to extract hidden states and deeper activations.

## 1. Install the libraries

Start with the minimum:

```bash
pip install torch transformers
```

Optional libraries:

```bash
pip install transformer-lens
pip install captum
pip install accelerate datasets
```

- `torch`: model execution and hooks
- `transformers`: pretrained models and tokenizers
- `transformer-lens`: easier access to named internal activations
- `captum`: attribution and gradient-based analysis
- `accelerate`, `datasets`: useful for larger experiments

## 2. Load a model with hidden states and attentions enabled

For encoder-style analysis, BERT is a good default choice:

```python
from transformers import AutoModel, AutoTokenizer

model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(
    model_name,
    output_hidden_states=True,
    output_attentions=True,
)
model.eval()
```

The important flags are:

- `output_hidden_states=True`
- `output_attentions=True`

## 3. Tokenize your input

```python
text = "Transformers build contextual token representations."
inputs = tokenizer(text, return_tensors="pt")
```

This gives you tensors such as:

- `input_ids`
- `attention_mask`

## 4. Run a forward pass

```python
with torch.no_grad():
    outputs = model(**inputs)
```

The output object usually contains:

- `outputs.last_hidden_state`
- `outputs.hidden_states`
- `outputs.attentions`

If you use a task-specific model such as `AutoModelForSequenceClassification`, you will also
get task outputs such as `logits`.

## 5. Read the internal representations

```python
hidden_states = outputs.hidden_states
attentions = outputs.attentions
last_hidden = outputs.last_hidden_state
```

Typical meaning:

- `hidden_states[0]`: embedding output
- `hidden_states[1]`: layer 1 output
- `hidden_states[2]`: layer 2 output
- ...

Typical tensor shape:

```python
print(hidden_states[0].shape)   # [batch, sequence_length, hidden_size]
print(hidden_states[-1].shape)  # [batch, sequence_length, hidden_size]
print(attentions[0].shape)      # [batch, num_heads, sequence_length, sequence_length]
```

## 6. Extract the representation you care about

### Whole-sequence representations

```python
layer_8_tokens = hidden_states[8][0]
```

This returns all token vectors for one example at layer 8.

### A single token representation

```python
token_index = 3
layer_8_token = hidden_states[8][0, token_index]
```

### A sentence representation for BERT-like models

```python
cls_vector = hidden_states[-1][0, 0]
```

For encoder models, the first token is often the `[CLS]` token.

## 7. Map vectors back to tokens

```python
tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
for token, vector in zip(tokens, hidden_states[-1][0]):
    print(token, vector.shape)
```

This is useful when comparing how token representations evolve across layers.

## 8. Capture deeper activations with PyTorch hooks

If hidden states are not enough, register forward hooks on specific submodules.

```python
activations = {}

def save_activation(name):
    def hook(module, inputs, output):
        activations[name] = output
    return hook

handle = model.encoder.layer[0].attention.self.register_forward_hook(
    save_activation("layer0_self_attention")
)

with torch.no_grad():
    _ = model(**inputs)

handle.remove()
print(type(activations["layer0_self_attention"]))
```

Hooks are useful for inspecting:

- attention blocks
- MLP/feed-forward blocks
- layer norms
- residual-stream-adjacent module outputs

## 9. Use TransformerLens for easier interpretability work

If you want named activations without manually wiring hooks, use `transformer-lens`.

```python
from transformer_lens import HookedTransformer

tl_model = HookedTransformer.from_pretrained("gpt2")
logits, cache = tl_model.run_with_cache("Transformers are useful for interpretability.")

print(cache["blocks.0.hook_resid_pre"].shape)
print(cache["blocks.0.attn.hook_z"].shape)
```

This is especially useful when you want access to:

- residual stream states
- attention head outputs
- MLP activations
- layer-by-layer named caches

## 10. Inspect or visualize the representations

Start simple:

```python
print(len(hidden_states))
print(hidden_states[-1].shape)
```

Then move to analysis techniques such as:

- cosine similarity between token vectors
- PCA or t-SNE for layer comparisons
- clustering by token or sentence
- attention heatmaps

## 11. Choose the right model family

- **BERT / RoBERTa:** best for encoder-side token and sentence representations
- **GPT-style models:** best for autoregressive token prediction and next-token analysis
- **T5:** useful when you need both encoder and decoder internals

If you are just getting started, begin with **BERT** for hidden-state inspection and **GPT-2**
for interpretability experiments with `transformer-lens`.

## 12. Minimal working example

```python
import torch
from transformers import AutoModel, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained(
    "bert-base-uncased",
    output_hidden_states=True,
    output_attentions=True,
)
model.eval()

inputs = tokenizer("Accessing transformer internals is easier than it looks.", return_tensors="pt")

with torch.no_grad():
    outputs = model(**inputs)

hidden_states = outputs.hidden_states
attentions = outputs.attentions

tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
cls_vector = hidden_states[-1][0, 0]
third_token_layer4 = hidden_states[4][0, 2]

print("Tokens:", tokens)
print("Number of hidden-state tensors:", len(hidden_states))
print("Final layer shape:", hidden_states[-1].shape)
print("Layer 1 attention shape:", attentions[0].shape)
print("CLS vector shape:", cls_vector.shape)
print("Third token at layer 4 shape:", third_token_layer4.shape)
```

## 13. Recommended starting point

For most workflows:

1. Install `torch` and `transformers`
2. Load a pretrained model with `output_hidden_states=True`
3. Inspect `hidden_states`, `attentions`, and token-level vectors
4. Add hooks only when you need submodule-level activations
5. Add `transformer-lens` when you want deeper interpretability tooling

That setup is enough for most research, debugging, and representation analysis tasks.
