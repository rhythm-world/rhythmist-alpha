# About maimai

Maimai is a Japanese arcade rhythm game by Sega, first released in 2012, and has evolved through many versions like DX, DX Splash, and the latest DX PRiSM+ in 2025.

The cabinet resembles a front-loading washing machine - a circular screen surrounded by eight physical buttons and touch sensors around the rim.

Up to two players can play per cabinet, and you can link up to four simultaneously.

## Basic Operation

Every note appears at the center of the screen and most of them travels outward toward the judgment circle. Players must operate properly to achieve a perfect hit.

The following is a summary of all note types in maimai:

- TAP: The simplest pink circular note. Hit the corresponding button or screen location at the right time.
  - BREAK TAP: A special red-yellow TAP note with higher score weight. Hit exactly like a normal TAP.
- HOLD: A note requiring sustained press. Hold down the indicated location until the note ends.
- SLIDE: A moving note with a track, starting with a star-shaped TAP. Hit the starting point and trace along the track. There are multiple shapes, which will be explained later.
- TOUCH: A block appears on the screen. Tap the designated sensor area.
- TOUCH HOLD: A block appears on the center of screen. Touch and hold a touch screen area for the duration.
- Pseudo TAP: HOLD or TOUCH HOLD that act as TAPs
- Delayed TAP: TAPs with slight timing offset

## Special Effects

- EX Notes: Looser judgment. Not MISSing is CRITICAL PERFECT.
- EACH Notes: Multiple simultaneous notes. All EACH notes turn yellow (except BREAK).
- SLIDE Variants:
  - Star-shaped TAP
  - Starless SLIDE
  - Rotating TAP
  - Forced normal TAP
- TOUCH Effects: Can trigger "firework" visual effects

## Song and chart

Songs offer 4 difficulty levels: Basic, Advanced, Expert, Master. Some songs also have Re: Master level.

Each difficulty is assigned a level from 1 to 15 with 1 hidden precision. If the decimal part >= 0.5, a `+` is appended (e.g 14.5 is displayed as 14+).

The difficulty value and the average perceived difficulty are not linearly corresponding, but increase slowly before about 13 and then incrase exponentially.

The timeline length of a chart must not exceed the length of the music, and must not be shorter than the music by more than 5 seconds (the end fade-out is not included in the music length here).

# Notations of simai

## Location of Note Numbers

First, please look at the image below.

```
 ⑧ ①

⑦   ②

⑥   ③

 ⑤ ④
```

This shows the numbered location of maimai's buttons and sensor areas.

They are numbered 1 to 8 in clockwise order. For sensor areas, each numbered location is further divided into 4 alphabet-numbered sensor areas as explained later.

These numbers are used to represent notes' position, so be sure to remember this.

## Chart Definition and Ending

A chart is composed by a series of commas and note notations.

Every comma occupies a certain length of time.

For example, when a comma has a length of 1 second and there are 10 commas in the chart, the chart will have a total length of (10×1s=) 10 seconds.

In this case, `1,1,1,1,1,1,1,1,1,1,1,1,1,` represents a chart with 10 TAP notes at BUTTON-1, in the density of 1 note per second.

Once the chart definition has begun, the chart can be defined using commas and note notations. However, for dealing with songs beginning with a fade-in section, a large number of commas would be needed.

To save the efforts, there is a parameter which determines how many seconds should pass since the music begins playing when the chart begins at the first comma of the chart.

This is determined by the parameter "first".

Since the timing of the beginning of the chart should be determined precisely and accurately, a number with decimal places such as 1.234 seconds is usually used. If "first" is 1.234 seconds, then the same `[1,1,1,1,1,1,1,1,1,1,1,]` chart will have 10 TAP notes at BUTTON-1 at 1.234, 2.234, 3.234, ..., and 10.234 seconds, respectively, after the music begins playing.

Just as a real sheet music has an ending notation, an ending should be defined in simai's notation, otherwise the music may continue playing endlessly.

※ When the chart definition is longer than the length of the MP3, the chart still ends when the MP3 is played to the end

The end of a chart is denoted by an `E`. If "first" is 1.234 seconds and the chart definition is `1,1,1,1,1,1,1,1,1,1,1,1,1,E`, the chart progresses until 10.234 seconds, as described above, and since the last comma also has a length of 1 second, the chart ends at 11.234 seconds.

A chart definition is a long string with a large number of commas and note notations and then an `E` at the end.

Line breaks, spaces, and tabs can be inserted in the middle of this string for better readability.

These characters are ignored when the chart definition is being parsed.

## Definition of BPM & Length of Notes

In the previous examples, a comma has the length of 1 second.

Although the following example has a BPM which make the calculation difficult on purpose, the length of a 16th note at 174 BPM is 0.08620689655... seconds.

If such length is assigned to every comma, notes with the length of a 16th note at BPM 174 can be placed correctly.

However, it would be troublesome to calculate this manually every time.

The per-comma length can be changed by adjusting the BPM and/or the length divider by using the following notations.

### How to Define the BPM

`(120)`

Input the BPM value and enclose it in a pair of round brackets. Since the BPM value should be accurate, a number with decimal places can be used.

### How to Define the Length Divider

`{2}`

Input the dividing value and enclose it in a pair of curly brackets. E.g., `{4}` specifies the per-comma length to be a quarter note, `{8}` to be an 8th note, and `{1}` to be the whole note. A number with decimal places can be used but should be avoided because it may cause confusions.

The BPM must be defined before the length divider.

Because the length of notes cannot be calculated unless the BPM value is defined,

when these two parameters are defined together, the length divider should come after the BPM.

E.g., `(120){2}` specifies the per-comma length to be a half note at 120 BPM (exactly 1 second). If the BPM value is B and the length divider is T, the per-comma length can be calculated using the following formula: Per-comma length = 240 / B / T (seconds).

Depending on the music, there might be cases where charting to a special sound effect or so with unknown BPM is attempted or matching the vocals precisely is desired. In these cases, `{#0.35}`, for example, can be used, and the per-comma length after this will become 0.35 seconds. When this notation is used, the per-comma length is already determined, so there is no need to specify the length divider.

These two parameters can be defined anywhere when necessary.

## TAP

From here on, note notations which can be added before a comma will be explained.

TAP is the most basic note type in maimai.

TAP's notation is very simple and is denoted by a button number followed by a comma.

TAP that occurs at BUTTON-1 ... `1,` TAP that occurs at BUTTON-5 ... `5,`

To change a TAP into a BREAK TAP, add a `b` before the comma, e.g., `1b,`, `5b,`.

## HOLD

To place a HOLD, in addition to the button number, how long the button should be held down should also be specified.

For example, for a hold to be held down for the length of a half note at 174 BPM, its held-down length would be 0.68965517241...... seconds.

However, as with the BPM example above, this is also troublesome to calculate manually every time.

If the current BPM is 174, then `(174)` has already been placed before.

What is missing is the length divider, [one half note].

The held-down length is written as `2:1`.

The number before the colon denotes the length divider (half note), and the number after colon denotes the multiplier of the length divider (1×). Hence the total held-down length of such HOLD note is (1 × half note =) one half note.

This way of denoting the length parameter is used in both HOLD and SLIDE.

In the actual notation, a button number is specified, an `h` is specified after the button number to make it clear that the note is a HOLD,

and then the held-down length is be specified after both of them.

HOLD that occurs at BUTTON-5 with the held-down length of one half note ... `5h[2:1],`

This is the basic notation. However, there might be cases where it is more convenient to specify the held-down length to be an exact number of seconds.

HOLD that occurs at BUTTON-4 with a held-down length of 5.678 seconds ... `4h[#5.678],` HOLD that occurs at BUTTON-4 with a held-down length of one half note at 150 BPM ... `4h[150#2:1],`

To change a HOLD into a BREAK HOLD, add a `b` after the `h` like `5hb[2:1],`. It does not matter whether the `h` and the `b` are swapped, as in `5bh[2:1],`.

## SLIDE (Basics & Shapes)

To place a SLIDE, many parameters should be specified,

such as the starting and ending button numbers, how they are to be connected with the arrow track, and how long the tracing star is to move.

Although SLIDE has gone through remarkable development in the history of maimai, and many features have been implemented to it,

this section only describes the basic notation and the shapes of SLIDE.

The format of SLIDE's basic notation is a combination of `starting point, shape of track, ending point, and tracing length`.

BUTTON-1 to BUTTON-4, straight shape, tracing length of 3 8th notes ... `1-4[8:3],`

The `8:3` part at the end of the notation is specified using the same concept as the held-down length described for HOLD.

For SLIDE, there is a waiting time after the approaching star-shaped TAP reaches the judgment line

and before the tracing star actually begins to move.

Specifically, it is one beat at the current BPM.

The tracing length of the SLIDE and the waiting time for the tracing star to start moving can be directly specified in seconds as follows:

Status ... BUTTON-1 to BUTTON-4, straight shape, 120 BPM

Waiting time is one beat at 160 BPM, tracing length is three 8th notes at 160 BPM ... `1-4[160#8:3],` Waiting time is one beat at 160 BPM, tracing length is 2 seconds ... `1-4[160#2],` Waiting time is 3 seconds, tracing length is 1.5 seconds ... `1-4[3##1.5],` Waiting time is 3 seconds, tracing length is three 8th notes at current BPM ... `1-4[3##8:3],` Waiting time is 3 seconds, tracing length is three 8th notes at 160 BPM ... `1-4[3##160#8:3],`

The arrow track of a SLIDE has many possible shapes.

`-` ... Straight shape Connects the start to the end in a straight line.

`>` `<` `^` ... Arc shape Connects the start to the end along the circled judgment line. If the direction of travel is to the right, use `>`. If left, use `<`. If the distance is shorter than half the circle, `^` can be used and thinking of the direction is thus not needed.

`v` ... v-shape Connects the start to the end through the screen center as the turning point in two straight lines.

`p` `q` ... p-shape, q-shape Connects the start to the end while curving around the screen center.

`s` `z` ... Thunderbolt shape Connects the start to the end with three short lines in the shape of a thunderbolt symbol (⚡).

`pp` `qq` ... Grand p-shape, Grand q-shape Connects the start to the end while curving along an imaginary circle which is tangent to both the screen center and the circled judgment line.

`V` ... Grand v-shape Connects the start to the end through a middle turning point in two straight lines. The line connecting the start to the middle turning point is always a short straight line.

`w` ... Fan shape Connects the start to three ends in an expanding track in a shape similar to a folding hand fan. Three tracing stars going to each end are spawn for this SLIDE shape.

For the `V` SLIDEs, the middle turning point is specified by an extra button number in addition to the button numbers of the starting and ending points.

Starting point is BUTTON-1, turning point is BUTTON-3, ending point is BUTTON-5 ... `1V35`

Every SLIDE has a constant tracing speed from the start to the end.

To change the track of a SLIDE into a BREAK SLIDE, add a `b` after the `]` like `1-4[8:3]b,`.

The allowed positions of the ending point relative to the starting point are restricted by the shape of the SLIDE.

The following lists the possible combinations of starting and ending points of each SLIDE shape where the arrow track of the SLIDE can be drawn normally.

- `-` can connect to any OTHER points except for adjacent points (e.g. ④-⑤, ①-⑧)
- `^` `v` can connect to any OTHER points except for points on the same diagonal (e.g. ②-⑥)
- `<` `>` `p,q` `pp,qq` can connect to any points
- `s `z` `w` can ONLY connect to points on the same diagonal
- `V` is the most complex. For Start-Middle-End, it's only valid if both:
  - There is exactly one point between Start and End (e.g. ③-⑤, ①-⑦)
  - End is 1, 2, or 6 steps clockwise from Middle, OR End is the reflection of Start across Middle (i.e., Middle lies exactly between Start and End on the circle)

## SLIDE (Multiple & Chaining)

### Multiple SLIDE

Multiple SLIDE refers to a SLIDE note with two or more arrow tracks stating from a single star-shaped TAP.

Each SLIDE arrow track is specified with its own set of parameters, since every set of parameters may be different for each SLIDE arrow track, except that the starting point is the same.

The tracing speed can be different for each SLIDE arrow track,

but these SLIDE arrow tracks are treated as EACH because their tracing stars begin to move at the same time.

BUTTON-1 to BUTTON-4, straight shape, tracing length of 3 4th notes, plus BUTTON-1 to BUTTON-6, arc shape, tracing length of 5 8th notes ... `1-4[4:3]*-6[8:5],`

After the starting button number at the beginning of the note notation, there is no need to repeat that button number.

An `*` can be added after the second SLIDE arrow track to specify the third arrow track and so on.

### Chaining SLIDE

Chaining SLIDE is a SLIDE note which composes of multiple SLIDE arrow tracks with their starting and ending points joined together and is treated as a single SLIDE arrow track.

For example, the `1V75` arrow track is internally two SLIDE arrow tracks (`1-7` and `7-5`) combined into one.

However, the combination is not limited to the grand V-shapes but can be any shape and two or more SLIDE arrow tracks joined together.

No matter how long the chaining SLIDE is, the tracing speed is calculated from the tracing length to be a constant from the start to the end of tracing.

BUTTON-1 to BUTTON-4 with straight shape, BUTTON-4 to BUTTON-7 with q-shape, BUTTON-7 to BUTTON-2 with straight shape, tracing length of two whole notes ... `1-4q7-2[1:2],`

Specify a series of button numbers and SLIDE shapes and then specify the tracing length at the end.

In the case of this SLIDE, the tracing star continues tracing at a constant speed from BUTTON-1 until it reaches BUTTON-2.

However, there might be cases where different tracing lengths are desired for some of the SLIDE arrow tracks.

In such cases, the tracing length for each SLIDE arrow track can be specified like `1-4[2:1]q7[2:1]-2[1:1],`.

However, be sure to specify the tracing speed for all individual SLIDE arrow tracks. Otherwise, an error may occur.

To change it to BREAK SLIDE, add a `b` after the `]`, which the same as for regular SLIDE. It is not possible to make only a section of chaining SLIDE into BREAK SLIDE. A chaining SLIDE note can only be either a normal SLIDE or a complete BREAK SLIDE. Therefore, even when different tracing speeds can be specified for some of the SLIDE arrow tracks, the `b` can be added only after the last `]`.

## TOUCH, TOUCH HOLD, & Firework Effect

### TOUCH

In maimai DX series, there are 34 sensor areas on the screen which the player can touch.

All of these can handle contact events, and SLIDEs require the contact events to be made in a specific order.

Since maimai DX, there have been new types of notes that require directly touching the sensor. They are TOUCH and TOUCH HOLD.

The sensor areas are also divided into five major groups:

- A, located adjacent to the buttons;
- B, located between Group A and the center of screen;
- C, which is in charge of the center;
- D, which fills the space between the areas of Group A;
- E, located slightly inward from Group D and adjacent to Group B.

Group C is in the center and has 2 sensor areas, while each of the other groups has 8 sensor areas which are numbered in clockwise order.

The sensor layout follows a polar coordinate system (r, θ) with the origin at the screen center. Angles (θ) are measured clockwise from the top (0°/360°, 12 o'clock position). Radial distances are expressed relative to R, the radius of the outermost white guide line.

- Center (r=0):  
  Labeled as C, covering both C1 and C2 sensor areas.
- Inner ring (B series, r=0.35R):  
  B8 (θ=0°), B1 (θ=45°), B2 (θ=90°), B3 (θ=135°), B4 (θ=180°), B5 (θ=225°), B6 (θ=270°), B7 (θ=315°).
- Middle ring (E series, r=0.6R):  
  E1 (θ=22.5°), E2 (θ=67.5°), E3 (θ=112.5°), E4 (θ=157.5°), E5 (θ=202.5°), E6 (θ=247.5°), E7 (θ=292.5°), E8 (θ=337.5°).
- Outer ring (r=R):  
  D series: D1 (θ=0°), D2 (θ=45°), D3 (θ=90°), D4 (θ=135°), D5 (θ=180°), D6 (θ=225°), D7 (θ=270°), D8 (θ=315°).  
  A series: A1 (θ=22.5°), A2 (θ=67.5°), A3 (θ=112.5°), A4 (θ=157.5°), A5 (θ=202.5°), A6 (θ=247.5°), A7 (θ=292.5°), A8 (θ=337.5°).

To place a TOUCH, the sensor number of the desired location is denoted in the same way as TAP.

TOUCH that occurs at SENSOR-B1 ... `B1,` TOUCH that occurs at SENSOR-D4 ... `D4,`

The sensor in the center is divided into two areas, C1 and C2. However, no TOUCHes appear separately for each of them, instead a TOUCH appears in the middle of the areas. Therefore, a TOUCH that occurs in the center can be denoted as `C,` without numbering. Denoting this as either `C1,` or `C2,` causes no errors and is treated the same as `C,`.

### TOUCH HOLD

TOUCH HOLD is a note that requires the sensor to be pressed and held.

It is counted as "HOLD" in the play result. The awarded score is also the same as HOLD.

This notation is a direct combination of TOUCH and HOLD.

Just simply replace the button number of a HOLD with a sensor number.

TOUCH HOLD that occurs at SENSOR-C with held-down length of 3 4th notes ... `Ch[4:3],`

While TOUCH has appeared in all 34 sensor areas since DX FESTiVAL,

So far, only the second phase of the final song of PRiSM PLUS KALEID×SCOPE Area has non-C zone TOUCH HOLDs. For compatibility, do not let TOUCH HOLDs appear in non-C zones.

### Firework Effect

Firework effect refers to the rainbow-colored radial effect

that appears as if fireworks are spreading from a certain location when a specific TOUCH is touched.

Since there was no official name for this effect at the time DX classic was launched,

We use the name "firework effect" for convenience.

To enable firework effect, add an `f` after the sensor number.

TOUCH that occurs at SENSOR-B7 with firework effect ... `B7f,` TOUCH HOLD that occurs at SENSOR-C with held-down length of two whole notes with firework effect ... `Chf[1:2],`

In the case of TOUCH HOLD, when `h` for HOLD and `f` for FIREWORK effect are specified together, either `hf` or `fh` is fine.

## EACH

If two or more notes occur at exactly the same time, they are treated as an EACH (BOTH).

In the case of SLIDEs, even if their tracing length are different,

they are still considered to be an EACH if their tracing stars begin to move at the same time.

The notes treated as part of an EACH change their color to yellow, except for BREAK notes.

An EACH is denoted by placing each composing note and separating each of them with a `/`.

TAP at BUTTON-1 and HOLD at BUTTON-8 with held-down length of one half note ... `1/8h[2:1],`

Their order does not matter, so the notation `8h[2:1]/1,` works fine. However, for SLIDEs, for example, in `1-4[8:1]/2-6[8:1],`,` 1-4[8:1]` will be displayed as if it occurred before `2-6[8:1]`. In other words, the SLIDE defined earlier will be displayed as if it occurred earlier.

Three or more elements are also treated as an EACH and can be denoted as note A / note B / note C ...

Only EACHes composing of only non-BREAK TAPs can be denoted like `12` without the `/`. The `/` between each note cannot be omitted even if there is only a single non-TAP or BREAK note within the EACH.

## EX Notes

TAP, HOLD, and BREAK can be specified as EX notes.

EX notes are judged to be CRITICAL PERFECT if they are hit within the timing window of GOOD or better.

Simulators that support only the autoplay mode always hit notes within the timing window of CRITICAL PERFECT regardless of the notes' EX setting.

However, Celeca have defined the notation because demands are expected for the needs of reproducing official charts

and/or charting for simulators that react to player's input.

To change a note into an EX note, add an `x` in the similar manner for changing the notes into BREAKs.

EX-TAP at BUTTON-1 ... `1x,` EX-HOLD at BUTTON-3 ... `3hx[α:β],` EX-BREAK at BUTTON-5 ... `5bx,` EX-BREAK HOLD at BUTTON-7 ... `7bxh[α:β],`

When two or more of `x`, `h`, and `b` characters are specified together, they can be specified in any order.

## Other Notations

The notations listed below allow charters to create special charts more easily,

such as the UTAGE charts appeared in MURASAKi version.

### Change Normal TAP to Star-shaped TAP

A BUTTON-1 TAP is denoted as `1,`. But if a `$` is appended and denoted as `1$,`, it changes into a star-shaped TAP that would appear if a SLIDE were placed.

This can be used in conjunction with a BREAK TAP or an EX-TAP. When two or more of `$`, `b`, and `x` characters are specified together, they can be specified in any order.

Also, if two `$` are stacked to form `$$`, the star-shaped TAP rotates. Currently, the rotation speed of the star-shaped TAP is a pre-defined constant.

### Change Star-shaped TAP to Normal TAP

When a SLIDE is described as `1-5[8:1],`, the BUTTON-1 TAP automatically changes into a star-shaped TAP, but if a `@` is appended to the star-shaped TAP as in `1@-5[8:1],`, this star-shaped TAP changes back into a normal TAP. The SLIDE is processed as usual, so the SLIDE arrow track appears to start from the normal TAP.

This can be used in conjunction with a BREAK TAP or an EX-TAP too. When two or more of `@`, `b`, and `x` characters are specified together, they can be specified in any order.

### Notations of Pseudo-TAP HOLD and Pseudo-TOUCH TOUCH HOLD

Assuming there is a HOLD denoted by `3h[1:1],`, if its held-down length is shortened to the limit, the required held-down length becomes instant, and the visual length of the HOLD shrinks as well, giving it the appearance of a hexagonal TAP. Although such a HOLD can be denoted like `3h[1000:1],`, it can be easily denoted by removing the held-down length notation like `3h,`.

The same notation can be used for TOUCH HOLD. For example, a TOUCH HOLD denoted as `Ch,` gives a judgment instantly when hit.

This can be used to denote a pseudo TAP or pseudo TOUCH. Note that this notation is treated internally as if `1280:1` were specified. It is because the held-down length of such notes is implied to be set to the length of a 1280th note in the official fan book sold by SEGA.

### Pseudo EACH

When denoting two TAPs that are almost but not exactly simultaneous,

the notes in the nearby section would needed be very fine-tuned in this way:

```simai
{96}
1,2,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
{8}
~~~~~~
```

In the above example, the 96th note length divider was used for the timing gap,
and specifying the notes to be closer to each other would be even harder.
When strictly reproducing an official chart, this made it infeasible,
and when creating a fan-made chart, this could be troublesome.

In this case, <code>1`2,</code> can be used. It makes the BUTTON-2 TAP placed only slightly later than the BUTTON-1 TAP but still almost simultaneous.

The BUTTON-2 TAP is processed internally as a TAP that is 1 millisecond later than the BUTTON-1 TAP.
Since they are not exactly simultaneous to become a part of an EACH,
the two TAPs do not turn yellow and do not count as an EACH on the play result.
For example, in <code>1`2`3/4,</code>, a BUTTON-2 TAP is placed 1 millisecond after the BUTTON-1 TAP,
and an EACH composing of a BUTTON-3 TAP and a BUTTON-4 TAP is placed another 1 millisecond after the BUTTON-2 TAP.

Note that, the <code>`</code> symbol can be entered by holding down Shift and pressing the `@` key right to the "P" key on a JIS layout keyboard
and also by directly pressing the <code>`</code> key left to the "1" key on a US or UK layout keyboard.

### SLIDE without Star-shaped TAP

When a SLIDE is placed, a star-shaped TAP normally always appears and approaches to the SLIDE's starting point, but this approaching star-shaped TAP can be eliminated.

Assume that there is a SLIDE denoted by `1-5[2:1],`.

The tracing star fades in before starting to move ... `1?-5[2:1],`
The tracing star does not fade in and suddenly appears when it begins to move ... `1!-5[2:1],`

In both cases, the SLIDE arrow track fades in and the approaching star-shaped TAP does not appear.
For creating a chart that letters, symbols, etc. are drawn using SLIDEs,
it is recommended to use `?` to make it clear where to start tracing.
For creating a chart with single-stroke SLIDEs, using `!` is recommended to avoid displaying extra stars on the screen.

# Example

The chart below is well-designed, corresponding the attachment 1:

```simai
(274){1},
{1},
{1},
{1},
{1},
{1},
{1},
{1},
{1},
{4}5,5,5,4/5,
{8}4,4,6,3,5,5,3,4,
{12}2h[4:1],,,4,3,4,3h[4:1],,,1,2,1,
{8}2,8,3,7,4,6,5,7,
{8}4,6,3,5,2-4[8:1],,1,,
{8}7,7,5,6,4,4,5,3,
{4}4v5[8:1],2,8v1[8:1],7,
{8}6-8[8:1],,2,2-4[8:1],,1,1,,
{8}7-5[8:1],8,7-1[8:1]v3[4:1],,,,,,
{8}5,5,3,4,2,2,4,3,
{12}1h[4:1],,,2,8,2,8h[4:1],,,6,7,6,
{8}7,5,8,4,1,3,4,2,
{8}5,1,6,8,7-5[8:1],,4,,
{8}2,2,1,3,8,8,1,7,
{4}8v1[8:1],6,4v5[8:1],3,
{8}2-4[8:1],,6,6-8[8:1],,5,5,,
{8}2,2,8,8,3/7,,,,
{4}6>4[4:1]*>4[4:1],4>8[2:1]*>8[2:1],C1,8<4[2:1]*<4[2:1],
{4},4>2[4:1]*>2[4:1],C1,8,
{8}B6,B5,B4,B3,B2,,E6,E5,
{8}E4,E3,E2,,8,,1/7,,
{4}2>4[4:1]*>4[4:1],4<8[2:1]*<8[2:1],C1,8>4[2:1]*>4[2:1],
{4},4<6[4:1]*<6[4:1],C1,8,
{8}8h[4:1],,1,7h[4:1],,8,6h[4:1],,
{8}4,4,5,,3/5,,4/6,,
{4}7>1[4:1]*>1[4:1],1>5[2:1]*>5[2:1],C1,5<1[2:1]*<1[2:1],
{4},1>3[4:1]*>3[4:1],C1,5,
{8}E8,E1,E2,E3,E4,,A7,A8,
{8}A1,A2,A3,,5,,4/6,,
{4}3>1[4:1]*>1[4:1],1<5[2:1]*<5[2:1],C1,5>1[2:1]*>1[2:1],
{4},1<7[4:1]*<7[4:1],C1,5,
{8}5h[4:1],,4,6h[4:1],,5,7h[4:1],,
{8}1,1,8,8,2,,1/3,,
{8}2h[16:1]/4h[16:1],,,4h[16:1]/6h[16:1],,,4h[16:1]/6h[16:1],,
{8}5,5,5,5,5,5,5,5,
{8}4h[16:1]/6h[16:1],,,2h[16:1]/4h[16:1],,,2h[16:1]/4h[16:1],,
{8}3,3,3,3,3,3,3,3,
{8}2h[16:1]/4h[16:1],,,1h[16:1]/7h[16:1],,,1h[16:1]/7h[16:1],,
{8}8,8,8,8,8,8,8,8,
{12}1h[2:1]/7,6,5,4,3,2,,8,7,6,5,4h[3:1],
{12}1,2,3,,5,6,7,8,1,2,3,4,
{8}5h[16:1]/6h[16:1],,,1h[16:1]/8h[16:1],,,2h[16:1]/4h[16:1],,
{8}3,3,3,3,3,3,3,3,
{8}2h[16:1]/4h[16:1],,,4h[16:1]/6h[16:1],,,6h[16:1]/8h[16:1],,
{8}7,7,7,7,7,7,7,7,
{8}7/8,8,8,8,8,8,8,8,
{8}1/8,1,1,1,1,1,1,1,
{8}2,2,2,2,3,3,3,3,
{8}4,4,4,4,5,5,5,5-1[0.2523##9.2143],
(210){1},
{1},
{1},
{8},,,,3,3,4,2h[16:1],
{8}2h[16:1],4,4,3,2h[16:1],2h[16:1],3,4,
{8}5,6,7,7,5,6h[16:1],6h[16:1],5,
{8}5,6,7h[16:1],7h[16:1],5-1b[8:1],8,5b,,
{16}8,,8,,2,,2,,7,6,5,,8,,8,,
{16}6,,6,,7V51[4:1],8,1,,,,,,2,,2h[8:1],,
{16}8,,8,,2,3,4,,1,,1,,3,,3,,
{16}2-6[8:1],1,8,,,,,,7,,7h[8:1],,1,,1h[8:1],,
{16}6,5,4,,8,,8,,3,,3,,7v1[8:1],6,5,,
{16},,,,2,,2h[8:1],,8,,8h[8:1],,3,4,5,,
{16}1,,1h[8:1],,6,,6,,2-8[8:1],3,4,,,,,,
(220){16}7,,7h[8:1],,1,,1h[8:1],,8,7,6,5,2/4,,2h[8:1],,
{16}5,,5h[8:1],,8-5[8:1]-7[8:1],1,2,3,4,,,,2,,2h[8:1],,
{16}8,,8h[8:1],,1,2,3,4,5/7,,7h[8:1],,3,,3h[8:1],,
{16}1V35[16:3],8,7,6,5,,,,(230)7,,7h[8:1],,5,,5h[8:1],,
{16}3,2,1,8,3/7,,3h[8:1],,5,,5h[8:1],,7V51[4:1],8,1,2,
{16}3,,,,(240)4,,4h[8:1],,8,,8h[8:1],,6,5,4,3,
{16}2/6,,6h[8:1],,4,,4h[8:1],,2,1,8,7,2b/6,,,,
(250){16}1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,
{16}1,5,1,5,8,4,8,4,8,4,8,4,7bx>7b[1.68##0.9231]p7[8:7],3bx<3b[1.62##0.9231]p3[8:7],7bx,3bx,
{16}7bx,3bx,7bx,3bx,7bx,3bx,7bx,3bx,7bx,3bx,7bx,3bx,7bx,3bx,7bx,3bx,
{16}7bx,3bx,7bx,3bx,7bx,3bx,7bx,3bx,(260),,,,,,,,
{1},
{2},(274),
{1},
{1},
{1},
{1},
{1},
{1},
{1},
{8},,,,5h[4:1],,,5h[4:1],
{8},,4/5,,3h[4:1],,,3h[4:1],
{8},,3/4,,5h[4:1],,,4h[4:1]/6h[4:1],
{8},,5/6,,4h[4:1],,,3h[4:1]/5h[4:1],
{8},,3/4,,5,5,3,3,
{8}6,6,4,4,3/6,3/6,3/6,3/6,
{8}4/5,4/5,4/5,4h[8:5]/5h[8:9],,,,,
{12},,,,,,3,2,1,8,7,6,
{24}3,,2,,1,,8,,7,,6,,3p5b[4:1],,,,,,5<3b[8:3],,,5,,,
{8},4,4,,7p1b[4:1],,1>7b[8:3],1,
{8},8,8,,1,8,1/7h[4:1],,
{8}1,5h[4:1],1,,1/3h[4:1],,1,5h[4:1],
{8}1,,1/7,,7/8q6b[4:1],,6>8b[8:3],6,
{8},7,7,,4q2b[4:1],,2<4b[8:3],2,
{16},,3,,3,,,,1,8,7,,5,,1,2,
{8}3,6,5/6,,7-5[8:1],8,7-1[8:1]v3[4:1],,
{8},,,,5-7[8:1]v4[8:1],,4-6[8:1]V82[4:1],4,
{8},3,3,,4-2[8:1]v5[8:1],,5-3[8:1]V17[4:1],5,
{8},6,6,,5,6,5/7h[4:1],,
{8}5,1h[4:1],5,,3h[4:1]/5,,5,1h[4:1],
{8}5,,5/7,,8-6[8:1]v1[8:1],,1-7[8:1]V53[4:1],1,
{8},2,2,,8-2[8:1]v7[8:1],,7-1[8:1]V35[4:1],7,
{16},,6,,6,,,,7,8,1,,4,,7,6,
{8}5,3,3/4,,2-6[8:1],1,2/8-4[8:1],,
{8}3/8,,,,6,5,6,3,
{8}4,3,5,5,2>4[8:1],2,8-4[8:1],8,
{8}1-5[8:1],1,7<5[8:1],7,3,3,4,2,
{8}5,1,6,6,5,7,4,8,
{8}3,3,1/3,,2,8,2,7,
{8}1,7,8,8,7<5b[8:1],7,1-5b[8:1],1,
{8}8-4b[8:1],8,2>4b[8:1],2,7,7,5,5,
{8}2,2,4,4,5,5,5,5,
{8}5,5,4/6,,7,5,6,2,
{8}4,3,7,7,1-3[8:1],1,8-4[8:1],8,
{8}7-3[8:1],7,6-4[8:1],6,2,2,1,3,
{8}8,4,7,7,8,6,1,5,
{8}2,2,2/4,,3,1,2,6,
{8}8,7,3,3,8-6b[8:1],8,1-5b[8:1],1,
{8}2-6b[8:1],2,3-5b[8:1],3,8,8,6,6,
{8}4,4,2,2,8,8,8,8,
{4}1/7,3/5,2<7[4:1],7<4[4:1],
{4}4>1[4:1],1<6[4:1],6>3[4:1],3>8[4:1],
{4}8<5[4:1],5>2[4:1],2<5[16:7],,
{16},,,,E5,E4,E3,E2,E1,E8,E7,E6,E5,,,,
{16}7,,7,,7/8,,,,1,2,3,4,1,2,3,4,
{16}8,1,2,3,8,1,2,3,7,6,5,4,7,6,5,4,
{16}8,7,6,5,8,7,6,5,1h[8:3],,,,,,4h[8:3],,
{16},,,,2h[4:1],,,,,,8,1,8,1,8,1,
{8}8,,3/6,,7-4[8:1],8,7,1-5[8:1],
{8}6,1,8-4[8:1],3,8,2-5[8:1]5,5,4,4,4,6,
{8}6,6,5/7,,6/7h[4:1],6,6,5,
{8}5,5,4,4,4,3,3,3,
{16}2/4,,,,(270)1b/2h[4:1],8,7,6,,,1h[4:1]/8b,7,6,5,,,
{16}7b/8h[4:1],6,5,4,,,1h[8:1],,4h[8:1],,3h[8:1],,6h[8:1],,,,
(285){16}7h[4:1]/8b,1,2,3,,,1b/8h[4:1],2,3,4,,,1h[4:1]/2b,3,4,5,
{8},8h[8:1],5h[8:1],6h[8:1],3h[8:1],,(300)8b,7,
{24}6,,,5,,,4,,,3,,,2b,,3,,4,,5,,6,,7,,
{48}8,,,,1,,,,2,,,,3,,,,4,,,,5,,,,(315)8b,,,7,,,6,,,5,,,4,,,3,,,2,,,1,,,
{48}8,,,7,,,6,,,5,,,2b,,3,,4,,5,,6,,7,,8,,1,,A2/D3,,A3/D4,,A4/D5,,A5/D6,,A6/D7,,A7/D8,,D1/A8,,A1/D2,,2bx,,3bx,,
{24}4bx,5bx,6bx,7bx,8bx,1bx,(339)2bx<2[4:17]*<2b[8:35]>2[8:33],,,,,,,,,,,,,,,,,,
{1},
{1},
{1},
E
```

The song is Apollo by sasakure.UK under the name TJ.hangneil. The example is the Expert chart of it, with 13.0 difficulty.

# Instructions

Please create a chart for the song (attachment 2) according to the above.

There should not be any comments in the chart. The chart must start with BPM mark.

Every line should start with a `{` `(` or `E`. `E` should take up a whole line.

You do not need to use every single thing your learned from the example, sometimes the song or the slices of songs is only a few seconds, it cannot holt too much information if the slice is not a climax part of the song.

Do not use Markdown. Output the chart without <code>```</code> only without any additional contents.
