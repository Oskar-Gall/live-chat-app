# Real-time Chat Room Application

Nowoczesna aplikacja czatu działająca w czasie rzeczywistym, zbudowana przy użyciu **JavaScript (ES6+)** oraz **Firebase Firestore**. Aplikacja umożliwia użytkownikom komunikację w różnych pokojach tematycznych, zmianę nazwy użytkownika oraz otrzymywanie powiadomień o zmianach.

---

### 🛑 Ważna informacja o uruchomieniu

Kod w pliku `script.js` zawiera zastępcze klucze API (`YOUR_API_KEY`) ze względów bezpieczeństwa. Aby aplikacja działała, musisz uzupełnić je własną konfiguracją Firebase.

---

## 🚀 Funkcje

* **Komunikacja w czasie rzeczywistym:** Wiadomości pojawiają się natychmiast u wszystkich użytkowników w danym pokoju (dzięki `onSnapshot` z Firestore).
* **System Pokoi (Rooms):** Możliwość przełączania się między kanałami (Ogólny, Gry, Muzyka, Programowanie). Wiadomości są filtrowane i ładowane dynamicznie.
* **Pamięć sesji:** Nazwa użytkownika jest zapisywana w `localStorage`, dzięki czemu po odświeżeniu strony nie trzeba jej wpisywać ponownie.
* **Bezpieczeństwo (XSS Protection):** Implementacja zabezpieczenia przed atakami XSS poprzez bezpieczne renderowanie treści (`textContent` zamiast `innerHTML`).
* **Powiadomienia UI:** Eleganckie powiadomienia pop-up przy zmianie nazwy użytkownika.
* **Architektura OOP:** Kod zorganizowany w klasy `ChatRoom` (logika biznesowa) i `ChatUI` (warstwa prezentacji).

---

## 🛠️ Użyte Technologie

* **Front-End:**
    * JavaScript (ES6 Modules, Classes, Async/Await)
    * HTML5 & CSS3 (CSS Variables, Flexbox)
    * Bootstrap 5 (dla responsywności i stylów bazowych)
* **Back-End (BaaS):**
    * **Firebase Firestore:** Baza danych NoSQL do przechowywania wiadomości.
    * **Firebase SDK 12.5:** Modularny import funkcji.

---

## 🏁 Instrukcja uruchomienia (Setup)

1.  Sklonuj repozytorium.
2.  Utwórz darmowy projekt w [Firebase Console](https://console.firebase.google.com/).
3.  Stwórz bazę danych **Firestore** i ustaw reguły na tryb testowy (`allow read, write: if true;`).
4.  Otwórz plik `script.js` w edytorze kodu.
5.  Na samym początku pliku znajdź obiekt `firebaseConfig`:
    ```javascript
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY", // <--- Tutaj wklej swój klucz
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        // ...
    };
    ```
6.  Zastąp wartości `YOUR_...` swoimi danymi z ustawień projektu Firebase.
7.  Uruchom plik `index.html` (zalecane użycie Live Server w VS Code, aby poprawnie obsługiwać moduły JS).