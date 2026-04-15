+++
title = "My git config"
template = "blog-post.html"
draft = true
[taxonomies]
tags = ["frontend", "architecture"]
[extra]
cover_image = "/images/blog/2024-09-01-shared-styles-in-monorepo/cover-webp.webp"
+++

```sh
[user]
	name = Cosme Valera
	email = cosmevalerareales@gmail.com

[alias]
	b = branch
	co = checkout
	d = diff
  l = log
  lo = log -n 10 --oneline
	s = status
	#############
	su = stash -u
	sp = stash pop
	sl = stash list
	#############
	rs = reset --soft
	#############
	a = add
	c = commit
  ac = !git add -A && git commit
  add-commit = !git add -A && git commit

[color "branch"]
	current = yellow bold
	local = green bold
	remote = cyan bold
[color "diff"]
	meta = yellow bold
	frag = magenta bold
	old = red bold
	new = green bold
	whitespace = red reverse
[color "status"]
	added = green bold
	changed = red bold
	untracked = magenta bold

[credential]
	helper = manager-core
[color]
	ui = true
[push]
	autoSetupRemote = true
```