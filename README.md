# WADS-FP

This project was made for COMP6343 Class Group 12. Group members:
* Nicholas Michael Halim
* Marco Melvern

## Front-End

Our front end uses Angular Framework for single-paged design. This enables fluid page transitions between pages with minimal load times during page navigation.
There are several plugins we used to make the site look pretty:
* Carousel
* Angular Material
* Bootstrap
* Templates published in StartBootstrap with modifications.

## Features

* Easily Signup and Login to create an account
* Verify your email
* Create events by supplying relevant data and a poster
* Manage the event by downloading list of attendees and getting payment proofs in one click
* Easily share the event-page by sharing the event-id
* Upload proof of payment easily, an email with instructions and link to upload the proof is sent after purchasing an event.

## Connection to Backend

The front-end connects to the backend using RESTFUL APIs, link to the backend repository can be found [here](https://github.com/nicholasm185/WASD-FP-Backend).

## Optimizations

While most of the website is eagerly loaded, the ADMIN routes are lazy loaded since not everyone can access it.