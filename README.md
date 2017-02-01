WHAT IS THIS
==
This is a mobile application to help doctors diagnose and analyse aphasia in patients

The quiz sends all data to a server (currently hardcoded as localhost, see TODO before the app is production ready)

There is no front end for the databse yet.

Supports English (en-\*) and dutch (nl-\*)

HOW TO RUN
==

run server:
```
pip3 install -r requirements.txt
python3 server.py
```

run client:
```
npm install
ionic serve
```

Note: ```Ionic run android``` is preferred, but a localhost server is not reachable from the device

TODO
==

* Secure file upload
* Better error handling client side (Why is nothing happening? Now we just console.error)
* Remove hardcoded localhost (Pass this as an environment variable?)
* Add tokens/user authentication to requests (Currently anyone can edit any quiz)