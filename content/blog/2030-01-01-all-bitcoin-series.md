+++
title = "BTC 102: How to Buy Bitcoin"
template = "blog-post.html"
description = "Learn how to buy bitcoins from exchanges, how to store them and the difference between hot and cold storage."
date = 2025-10-14
draft = true
[taxonomies]
tags = ["bitcoin", "finance"]
[extra]
cover_image = "/images/blog/2025-07-25-bitcoin/bitcoin.webp"
+++

![blog-cover](/images/blog/2025-07-25-bitcoin/bitcoin.webp)

```js
Posts Order:
100s Series - Bitcoin Fundamentals & Getting Started

- BTC 101: Why Bitcoin? (already done - theoretical foundation)
- BTC 102: How to Buy Bitcoin (already done)
- BTC 103: Cold Storage Fundamentals 
  - When to make the move from hot to cold storage
  - Hot vs cold wallet differences (it's been already covered in 102, maybe mention again)
  - Setting up hardware wallets (Coldcard MK4/Q)
  - Seed phrase backup with metal plates (OneKey KeyTag)
  - Basic Sparrow wallet setup (Link to another Sparrow post maybe BTC-204 )

* Quick notes. 1: The idea of 102 is to be as brief as possible, so people can actually start somewhere buying their first sats with just enough information. 2: BTC 103 Cold Storage could be 201 since it's more complicated. But I'll just say at the start of 103 to start small. And wait several months before going Cold Storage.

200s Series - Advanced Bitcoin concepts
- BTC 201: Bitcoin's Network Effect
  - What is the network effect
  - Decentralization
  - Why the other crypto assets can not overcome Bitcoin
  - References:
    - https://river.com/learn/will-bitcoin-be-replaced/
    - https://river.com/learn/bitcoins-network-effect/
  - Mention this post in BTC 101 at the end with a short paragraph in common doubts about this whole thing of the Network Effect very summarised. And saying click here to go check BTC 201, where this is explained. (Be careful with redirects, if they go from 101 to 201, and then continue like 202, 203, etc. They will be missing 102 which is important to put it in practice and actually buy the bitcoin. Maybe in 201, remention that if they missed it, or just in general, they can always visit 102 to start buying sats)
- BTC 202: How Bitcoin Wallets Really Work
  - The "empty space" concept - wallets as boxes in mathematical space
  - Why the astronomical number of possibilities makes Bitcoin secure (https://www.youtube.com/watch?v=S9JGmA5_unY)
  - Satoshi's unmoved coins as proof of security
  - Why it's more profitable to mine than to search for random wallets
  - The math behind private keys and addresses
- BTC 203: UTXOs - Bitcoin's Unique Transaction Model
  - UTXOs vs account model (Bitcoin vs Ethereum/banks)
  - Why Bitcoin chose the UTXO model (traceability, gold-like properties)
  - UTXO consolidation and management
  - Introduction to coin selection strategies
  - Basic privacy considerations
- BTC 204: Sparrow in depth
  - Introduction
    - Why Sparrow is the gold standard for Bitcoin desktop wallets
    - What makes it different from mobile wallets (cold wallets)
    - Prerequisites: Should have completed BTC 103 (hardware wallet setup)
  - Sparrow Installation and Initial Setup
    - Downloading from official sources and verifying signatures
    - Initial configuration and connecting to your Bitcoin node (or public servers)
    - Importing your hardware wallet (Coldcard focus)
    - Wallet creation vs wallet import (Better to wallet import, so it's really cold wallet, since the private key has been created in the coldcard, and has never been in a machine with internet)
  - Understanding Sparrow's Interface (Transactions, Send, Receive, UTXOs, Addresses)
  - UTXOs management basics (since it's been talked about in the previous post)
  - There are more advanced stuff like, multisig, Shamir, RBF, CPFP and so on. What fits okay, and what no, can be in BTC 204 or in other posts.
- BTC 205: Advanced Security Concepts
  - Passphrases (25th word) - when and how to use them
  - Basic multisig concepts and use cases
  - Inheritance planning for Bitcoin
  - Social recovery methods
  - Common security mistakes to avoid
- BTC 206: Multisig
  - Multisig 2-3 example (like the BTC 103 but with 2-3)

* Quick notes. Maybe the 200 series should be theoretical (like the BTC 101), and the 201 series should be practical (like the BTC 102 and 103). So that the 301 for example could be multisig 2-3. In that case the lightning network I don't know if in the 300s too, or if in the 400s potentially (togethter with AQUA and other 2-layer stuff maybe).

300s Series - More Advanced Bitcoin concepts
- BTC 301: Lightning Network
  - Mention how it works and what it is (everyday money)
  - Mention Muun for a simple setup
  - Mention AlbyHub (and chema post about how to set up yours)
- BTC 302: More lighning network stuff, or maybe move the BTC 205: Advanced Security Concepts to here (?)
- BTC 303: What can do governments do against Bitcoin?
  - Short version: Nothing 
  - Long version: [Information from the book: La filosofía de bitcoin + my own research]

```

```js
Another blog-post for the continuation (This is actually trying to do too much, it's better ot split hot wallet into one post, and cold wallet into another post. It's nice to explain the difference tho. 102+103):
- 1. Simple set up of using Relai/21Bitcoin to buy your bitcoins with DCA every month (DCA vs lump-sum vs timing the market (be brief, and why DCA is recommended in my opinion)),
- 2. how to set up cold storage. -> Say options for each thing, but for the cold wallet recomment Coldcard-mk4 or Colcard-q (the difference between hot and cold storage. Small tutorial about Sparrow, or just mention it, and say that it will be talked more about in the last section),
- 3. And buy the OneKey KeyTag (or similar) for the writing your private seed there and put it inside a safe.
- 4. Sparrow and UTXOs.
- 5. Extra section, with more stuff, like Multisig setups, Shamir. 

---

Also say that memory seeds are not recommended anymore, and paper seeds either. (e.g., The recommended approach nowadays is to use a durable metal seed‑phrase backup like the OneKey KeyTag—instead of relying solely on memorizing your seed or storing it on paper. Memory-only ('brain') wallets are no longer recommended, and paper-based seed backups are not considered secure).

About UTXos, also say everything else, like UTXOs vs normal account (like ethereum or bank accounts) and why it was made like this in bitcoin (I think so that it was more similar to gold, and so that every coin could be followed perfectly through the blockchain). And also mention what is Consolidation, and other things like Coinjoin and other stuff, although I could put all of this at the very end like extra information or similar, since it's more technical and specific.

Another thing to talk about is that the actual wallets are just boxes in the emptiness of the space, that anyone could access any of these boxes (except for passphrases and multisigs or similar), but the magic is that the number of possibilities is so absurdly high that it's much more profitable to just mine bitcoins instead of trying to find wallets in the emptiness of the space of private wallets. This concept is hard to grasp, and you feel insecure at first, but as an example there is there the wallet of satoshi, and no one has uncovered its keys in over 10 years, since they haven't moved, and most probable no one will. (https://www.youtube.com/watch?v=S9JGmA5_unY).
Although maybe this whole topic, is worth another post (BTC 103 (?)). However, it's true that my idea was to make 101 and 102 the essentials of understanding and then of practicality. And this is more like doing details, so maybe BTC 201, like entering the details or a new course to put it that way idk, it depends also on how long it gets the 102 in total, what things fit inside it, and if using the 201 is going to be understandable which I guess yes, in that case, maybe i could do like BTC 201: the wallets/bit256; BTC 202: Passphrases and Multisig and Shamir/SSS (there are other things like what is your actual saving strategy, or inheritance strategy, as well as other tihngs like: Threshold Signatures, Social Recovery, Vaults / Scripts). Maybe BTC 203: Lightning Network (I could mention the chema post about how to set up your alby lighning node, and so on).

Mention also Sparrow. For example, this is what ChatGpt so that why not to use paper wallets (insecure and old alternative, were you had both the private and public keys in one piece of paper): 🔐 Modern Alternatives:
- Hardware wallets (e.g., Ledger, Trezor, Coldcard)
- Seed phrase backups in metal (e.g., OneKey KeyTag, Cryptosteel, ColdTi)
- Multisig setups (e.g., Sparrow + hardware wallets)
```
