package com.team1O1.api.Sessions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.team1O1.api.User.UserRepository;
import jakarta.servlet.http.HttpSession;

// @CrossOrigin
@RestController
public class SessionController {

    // Create a session and store an attribute
    @PostMapping("/login")
    public ResponseEntity<String> createSession(HttpSession session, @RequestBody LoginForm loginForm) {
        // Set a session attribute (e.g., username)
        String username = loginForm.getName();
        String password = loginForm.getPassword();
        session.setAttribute("username", username);
        System.out.println("logging in");
        //set userid
        // Retrieve and return the session ID
        String sessionId = session.getId();
        return new ResponseEntity<>("{\"sessionId\": \""+sessionId+"\"}", HttpStatus.OK);
    }

    // Retrieve session attribute
    @GetMapping("/session")
    public ResponseEntity<String> getSession(HttpSession session) {
        // Get the session attribute (username)
        String username = (String) session.getAttribute("username");

        // If no session exists, return an error message
        if (username == null) {
            return new ResponseEntity<>("{\"session\": false}", HttpStatus.OK);

        }

        // Return session data to the client
            return new ResponseEntity<>("{\"session\": true, \"userId\": 12345678}", HttpStatus.OK);
    }

    // Invalidate the session
    @PostMapping("/logout")
    public String invalidateSession(HttpSession session) {
        // Invalidate the session
        session.invalidate();
        return "Logged out";
    }
}