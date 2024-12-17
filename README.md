3. Dynamic Logics

Questionnaire Submission: The QuestionnaireForm component correctly submits referral source and referral data to the /api/users endpoint using Axios. It handles optional referral by only adding the referredBy field if it's needed.

Admin Offer Creation: The Admin page allows you to create and update offers. These offers can be added, edited, or removed from the database, dynamically changing offer list.

Earnings Ladder: The earnings ladder is basic in this version, but the core functionality of tracking offer completion is now present in the User model. It has a completedOffers array to keep track of this. The OfferDetail page now also has a button to complete an offer which will be updated on the database.

