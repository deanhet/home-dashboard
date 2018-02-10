---
layout: page
title: Home Dashboard
tagline: THE HOME OF THE FUUUTUUUURE
description: A react-native dashboard to show what's going on in the house
---

# The home of the future!

### TODO: BIG FINAL PICTURE HERE 

I'm obsessed with controlling my home. Once you get into home automation it's a slippery slope. One minute you're bookmarking potential ideas, the next you're asking the in-laws to get you light bulbs for Christmas.

With an iPad that was just otherwise lying around doing nothing, I wanted to build a dashboard that would passively give info about what's going on in and around the home. I had only had two goals in mind when I started this project: 

- The app should be entirely self-contained. Requests should originate from and be processed on the iPad. I didn't want to have an additional dependency of a server.
- Try as much as possible to avoid the terrible, huge-icon, '90s home pad interfaces. Information should be available at a glance rather than behind a couple of screens.

That being said, I'll let you be the judge of how I fared.

The app is built entirely in React-Native. All the source code is available [here](https://www.github.com/deanhet/home-dashboard). It's structured in such a way that each 'widget' on the page is self contained with its own actions and views. It should hopefully be easy enough to see what each part is doing on its own. You should be able to pull and build the app yourself, although not much will come up if you don't fill out the required info in `keys.js`.

## Integrations
- [Clock](#clock)
- [Spotify](#spotify)
- Hue
    - [Sensors](#hue-sensors)
    - [Lights](#hue-lights)
- [Bus Tracker](#bus-tracker)
- [Meal Plan](#meal-plan)
- Weather
- iCloud Find my iPhone
- TV Schedule
- Calendar events
- Screensaver

## Frameworks and dependencies
- React-native
TODO: 


### Clock
TODO: SCREEN SHOT OF CLOCK

Shows the current time, day, date and year.

The core of this component is just a setInterval loop that runs every second. I wanted to avoid a heavy library like [moment](https://momentjs.com/) just to format time so I made extensive use of `Date.toLocaleString`. Turns out that Javascript has a lot of useful built-in functions for formatting Dates.

### Spotify
Shows the currently playing Artist and Song

TODO: Gif of sliding in bar

If a song is currently playing, a bar will slide up showing song info. I eventually added next/previous controls after giving the app some real-life use. The Spotify API doesn't currently offer a websocket/constant connection so the app pings a request every 15 seconds. It's not an ideal solution and I'd love to change away from this approach.

### Hue Sensors
TODO: Screenshot of component on its own

My entire home is kitted out with Hue lights and a couple of motion sensors to automatically trigger them. It seems to be little advertised but the [Hue Motions Sensors](https://www2.meethue.com/en-us/p/hue-motion-sensor/046677473389) can also measure temperature and light levels. This component takes the temperature in my hall and kitchen every 5 minutes. The main home temperature is just an average of the two. The thermometer icons will change depending on each temperature.

### Hue Lights
Buttons to toggle lights on and off and change brightness.

This component went through a lot of work before I settled on the final design. After sharing some early screenshots with friends, they gave me the idea for the 'floorplan'. As you can see below, it went through some very ugly prototypes before landing on the final design.

![room-plan](assets/images/room-plan-progress.png)

Touching a room will switch the lights on/off in that room. You can also hold and drag over room to change the brightness. This uses a lot of [PanResponder](https://facebook.github.io/react-native/docs/panresponder.html) to handle the dragging.

TODO: Gif of brightness slider

### Bus tracker
Shows when the next bus is at nearest stop with a scrollable panel of future buses. A warning icon will show if there are delays or problems on the route.

TODO: Screenshot of bus tracker

In this case, I'm only particularly interested in the bus that goes into the city centre. Luckily, the council provides a nice API for tracking buses in my area. 

I requested a key during a weekend so while waiting for a response I 'borrowed' a couple of other apps keys by decompiling an Android app using [apktool](https://ibotpeaches.github.io/Apktool/) and listening for network requests using [mitmproxy](https://mitmproxy.org/).

They're both a good way to feel like Mr Robot and both worth exploring further in a future blog post. I developed against the keys and quickly swapped in my own when I got a reply first thing on the Monday (credit to the council for the quick reply!).

### Meal Plan
Shows the upcoming meals for the week. List order rotates so the current day is always at the top.

TODO: screenshot of meal plan

It was surprisingly tricky to settle on an interface for this. This component has the ability to add and remove new meals and assign them to days. It got a lot easier once I decoupled the concepts and started treating them as two separate things.

First attempt:

![flip-idea](assets/images/flip-idea.gif)

I eventually settled on a modal that shows when a day is pressed. 

TODO: screenshot of meal modal

### Weather
Shows the current weather (apparent and actual temperature), with summary and forecast for the next hour.

TODO: Screenshot of weather

Making use of the great [Dark Sky](https://darksky.net) API, this component provides a lot of value for not a lot of effort. I opted to make the 'feels like' temperature more prominent than the actual temperature. It's no use being prepared for it to be 15 degrees outside when it actually feels a lot colder than that. The API also returns what kind of icon should be shown so that gets matched up with a custom icon font that I built using [fontello](http://fontello.com/).

### Find my iPhone
Shows current battery percentage and location of phones. Has the ability to ping device too.
TODO: Screenshot

- TODO: Gif of finding sarah's phone
- Google maps integration
### TV Schedule
TODO: Screenshot of tv schedule
### Calendar events
TODO: Screenshot of calendar
### Screensaver
TODO: screenshot of screensaver

## Contact


