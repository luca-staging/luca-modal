/** Living rooms, hotel rooms, office rooms, beaches, and swimming pools. */
const u = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const REAL_ESTATE_IMAGES = {
  livingRoom: u("photo-1618221195710-dd6b41faaea6"),
  livingRoomAlt: u("photo-1586023492125-27b2c045efd7"),
  livingRoomSoft: u("photo-1600210492486-724fe5c67fb0"),
  hotelRoom: u("photo-1611892440504-42a792e24d32"),
  hotelRoomAlt: u("photo-1590490360182-c33d57733427"),
  hotelRoomSuite: u("photo-1582719478250-c89cae4dc85b"),
  officeRoom: u("photo-1497366216548-37526070297c"),
  officeRoomAlt: u("photo-1497366811353-6870744d04b2"),
  officeRoomDesk: u("photo-1497215728101-856f4ea42174"),
  beach: u("photo-1507525428034-b723cf961d3e"),
  beachAlt: u("photo-1519046904884-53103b34b206"),
  beachShore: u("photo-1473116763249-2faaef81ccda"),
  pool: u("photo-1576013551627-0cc20b96c2a7"),
  poolAlt: u("photo-1575429198097-0414ec08e8cd"),
  poolDeck: u("photo-1540541338287-41700207dee6"),
};

export const DEFAULT_PROPERTY_IMAGE = REAL_ESTATE_IMAGES.livingRoom;
