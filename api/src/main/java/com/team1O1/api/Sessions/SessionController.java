package com.team1O1.api.Sessions;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@RestController
public class SessionController {

    // Create a session and store an attribute
    @GetMapping("/login")
    public String createSession(HttpSession session, @RequestBody LoginForm loginForm) {
        // Set a session attribute (e.g., username)
        String username = loginForm.getName();
        String password = loginForm.getPassword();
        session.setAttribute("username", username);

        //set userid
        // Retrieve and return the session ID
        String sessionId = session.getId();
        return "{\"sessionId\": "+sessionId+"}";
    }

    // Retrieve session attribute
    @GetMapping("/session")
    public String getSession(HttpSession session) {
        // Get the session attribute (username)
        String username = (String) session.getAttribute("username");

        // If no session exists, return an error message
        if (username == null) {
            return "No";
        }

        // Return session data to the client
        return "{\"userId\": "+12345678+"}";
    }

    // Invalidate the session
    @GetMapping("/logout")
    public String invalidateSession(HttpSession session) {
        // Invalidate the session
        session.invalidate();
        return "Logged out";
    }
}