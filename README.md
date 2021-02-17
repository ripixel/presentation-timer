# presentation-timer

A simple presentation countdown timer with music streaming for use on streams/presentations.

## Usage

Go to [https://pt.ripixel.co.uk/](https://pt.ripixel.co.uk/), and configure your timer as instructed.

When you hit the button, you will see your presentation timer has begun, and another config window has popped open to allow you to amend it while running, without disturbing the presenting window.

That's it!

![screenshot](./screenshot.png)

## Why?

When doing presentations, it's nice to have a countdown to the start at the beginning, and it's even nicer to have some music playing in the background. However, combining these two things usually means a lot of messing around with audio inputs/outputs, or you just resort to playing the music out your speakers and detecting it with your microphone, or capturing your entire machine's audio.

Having the presentation countdown **and** the music playing in the same tab means most streaming tools can pick up the audio in a nice way.

## Running locally

Run `npm ci` to install dependencies, then `npm run dev` to boot up a local server.
