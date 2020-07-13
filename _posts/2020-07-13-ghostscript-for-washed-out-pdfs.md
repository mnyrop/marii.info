---
layout: post
title: Using Ghostscript to Covert Washed-Out PDFs to PNGs for OCR Processing
time_period: 2020
img: '/images/ghostscript.gif'
tags: ghostscript;ocr;bash
---

I was given a batch of PDFs from a legacy journal site. The PDFs varied in length from 1 to 5 pages, included poetry and criticism (sometimes in multiple languages), and were low in contrast—i.e., the text was medium grey on a lighter grey background. Here's a sample, for reference:

<br>

![excerpt for greyscale reference](/images/sample-greyscale.png)

<br>

I wanted to [OCR](https://tedium.co/2017/03/22/ocr-typography-optical-character-recognition-history/) the pdfs, but when I ran them through my general-purpose pipeline (using vanilla [Ghostscript](https://www.ghostscript.com/) to convert the PDFs to TIFs, then using [Tesseract](https://opensource.google/projects/tesseract) to extract text from the TIFs), the text was garbáge.

I looked at the generated TIFs to try and see if the problem was on the OCR side or the format conversion side. As you can see from the sample below, Tesseract never had a chance. The problem was with the conversion to TIF.

<br>

![excerpt for greyscale reference](/images/bad-conversion.png)

<br>

It took quite some time digging through Stackoverflow questions and reading Ghostscript(GS) docs before I found a working solution. There are so many ways to configure and optimize GS—it can get really overwhelming. So I thought I'd share and dissect the many parameters behind the command that eventually worked for me.

Without further ado, here's the special sauce:

```sh
gs \
  -q \
  -dNOPAUSE \
  -dBATCH \
  -sDEVICE=pnggray \
  -g2550x3300 \
  -sOutputFile=$png_dir/%03d.png \
  $pdf
```

Breaking it down line by line:

<dl>
  <dt><b>gs</b></dt>
  <dd>the ghostscript invocation name</dd>

  <dt><b>-q</b></dt>
  <dd>runs the command in 'quiet mode'; optional for our purposes</dd>

  <dt><b>-dNOPAUSE</b></dt>
  <dd>disables the prompt and pause at the end of each page. (see more <a href="https://www.ghostscript.com/doc/current/Use.htm#Interaction_related_parameters">here</a>.)  
  not relevant to our problem, but you're not going to want to interact with a prompt every time you convert a file in a large batch. so you'll want to add this.</dd>

  <dt><b>-dBATCH</b></dt>
  <dd>related to <code>-dNOPAUSE</code>. if you're running this as part of a script, just use it. trust me.</dd>

  <dt><b>-sDEVICE=pnggray</b></dt>
  <dd>sets which output device Ghostscript should use, in this case, <code>pnggrey</code>. (see more <a href="https://www.ghostscript.com/doc/current/Use.htm#Output_device">here</a> and <a href="https://www.ghostscript.com/doc/current/Devices.htm#PNG">here</a>.)</dd>

  <dt><b>-g2550x3300</b></dt>
  <dd>specifies the device width and height in pixels. you'll want to adjust these for your purposes and play around as necessary. (see more <a href="https://www.ghostscript.com/doc/current/Use.htm#Parameters">here</a>.)</dd>

  <dt><b>-sOutputFile=$png_dir/%03d.png</b></dt>
  <dd>specifies which path(s) to write the resulting files to. in my case, a shell script uses a variable to <code>$png_dir</code> to streamline the placement. The file ends in <code>.png</code> because that's the conversion device i'm using and the result i want. <code>%03d</code> uses ghostscript's <code>%d</code> syntax for multipage documents, and specifically creates 001.png, 002.png, etc. as needed depending on the number of pages in the original PDF document. (the <code>03</code> specifies digit padding with zeroes)</dd>

  <dt><b>$pdf</b></dt>
  <dd>this is (absolute or relative path) to the path to the file you want to convert. in my case, <code>$pdf</code> is the variable for the path to each PDF file as globbed by my shell script. you can similarly use a variable or write out the path.</dd>
</dl>


(more soon...)
