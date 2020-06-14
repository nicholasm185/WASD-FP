# WADS-FP

This project was made for COMP6343 Class L4AC Group 12. Group members:
* Nicholas Michael Halim - 2201798761
* Marco Melvern - 2201798351

## ticket<b>maya</b>.me
This is the front end repository for the website ticketmaya.me. 

## Front-End

Our front end uses Angular Framework for single-paged design. This enables fluid page transitions between pages with minimal load times during page navigation.
There are several plugins we implemented to enhance the experience in using this site, to name a few:
* Carousel by OWL Carousel
* Angular Material
* Bootstrap
* Templates published in StartBootstrap and Colorlib with modifications.
* Browser Animation by AOS
* Countdown Timer supported by Ngx Countdown

*All rights reserved to their respective owners.*

## Features

* Easily Signup and Login to create an account
* Verify your email
* Create events by supplying relevant data and a poster
* Manage the event by downloading list of attendees and getting payment proofs in one click
* Easily share the event-page by sharing the event-id
* Upload proof of payment easily, an email with instructions and link to upload the proof is sent after purchasing an event.

## Step-by-step to creating an event

1. Create your account using the signup button from the top bar.
2. After, successfully registerd, you will be directed to the dashboard. There you will be able to see your basic info and events.
3. Head to the create event page from the top bar, you will be shown a form to create the event
Tip: you can add up to 3 emails and phone numbers as contact person per event
4. After filling up the details and uploading your event poster, you can then click the 'create event' button
5. If successful, your event will now have its own event page, head on to your dashboard to see the event.
6. Sharing the event is as simple as sending people the link to the event page, or giving them the event code!

## Step-by-step to purchasing a ticket

1. If you have the event code, head on to the search page from the top bar
2. Put in the event code and hit enter on your keyboard, you will be directed to the event page.
3. Click on the buy ticket and fill in the form
4. An email will be sent to you with a link to upload the payment proof
5. After submitting the proof of payment, your ticket will then be labeled as paid, the EO will verify your proof.

## Getting list of attendees and payment proofs
* List of attendees and proof of payments can be downloaded from dashboard by clicking the buttons on the 'Your Events' section

## Admin controls
* If your account is registered as an admin, a link to the admin page can be seen on the dashboard
* Admin can see users registered on the website
* Admin can ban users, which will cause the user to be unable to log in

## Optimizations

While most of the website is eagerly loaded, the ADMIN routes are lazy loaded since not everyone can access it.

## Website Design

We incorporate the integration of Bootstrap, Angular Material, along with our own design language to craft and develop the design language of this website. 
The templates that we implemented are listed on the section below:

### Homepage Design
* Template Name: Sailor - v2.0.0
* Template URL: https://bootstrapmade.com/sailor-free-bootstrap-theme/
* Author: BootstrapMade.com
* *License: https://bootstrapmade.com/license/*

### Event Page Design
* Template Name: Workshop
* Template URL: https://colorlib.com/wp/template/workshop/
* Author: Colorlib.com
* *License: Template is licensed under CC BY 3.0.*

*All rights reserved to their respective owners.*



## Connection to Backend

The front-end connects to the backend using RESTFUL APIs, link to the backend repository can be found [here](https://github.com/nicholasm185/WASD-FP-Backend).





