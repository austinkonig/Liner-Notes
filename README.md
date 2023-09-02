# Liner Notes

Welcome to Liner Notes, an audio platform for uploading and downloading drum files and sample packs. For producers, by producers.
Liner Notes is meant to solve an age-old problem behind searching for samples, particularly in forums such as Reddit that may have invalid links, deleted drum packs, etc.

This repository is my first official project on GitHub and is a demo of what this site will offer in a final build.

Through Liner Notes, I'm using mern learning resources from Adrian Hajdin, of JS Mastery. For more information on JS Mastery's web development guides, please visit Hajdin's Github at https://github.com/adrianhajdin.

To demo the site, check out https://liner-notes.netlify.app/, powered by Netlify for the front end and Render.com for the backend.

## Features - Front End

- **Upload and Download:** Easily upload your own audio files (wav, flac, mp3, etc.), and search a variety of sounds uploaded by other users.
- **LOGIN/SIGNUP:** Edit and delete your files (*NOTE: Google Authentication is currently inactive, and will be added soon. (JWT Token Services w/ MongoDB ONLY)*).
- **Demo Version:** Please note that this repository is a basic DEMO that will be updated continuously. Please be mindful of bugs and limited features for the time being.

## Getting Started

To get started with Liner Notes, you can follow these steps:

1. **Clone the Repository:** Clone this repository to your local machine using the following command: git clone https://github.com/austinkonig/liner-notes

2. **Install Dependencies:** Navigate to the project directory and install the necessary dependencies for both the frontend and backend components.
- NOTE: If you see an error starting with "Error: error:0308010C:digital envelope routines::unsupported...", please visit this forum for information on how to fix it:
https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

3. **Run the Application:** Launch the app locally. For now, this uses yarn for adding dependencies.

## REST API Repository

In conjunction with this front end, I have a REST API that fills in the server-side functionality, including posting files, deleting files, editing files (to be added), and authenticating users. For more, see the [Liner Notes API repository](https://github.com/austinkonig/liner-notes-api).

## Contributions

Please feel free to send any feedback, bug reports, or other comments to my linkedin on my profile. Thank you for your patience!
        
*NOTE: Refer to the latest version of this README as the project progresses.
