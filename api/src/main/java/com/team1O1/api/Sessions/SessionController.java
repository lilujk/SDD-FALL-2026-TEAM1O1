package com.team1O1.api.Sessions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.team1O1.api.User.User;
import com.team1O1.api.User.UserRepository;
import jakarta.servlet.http.HttpSession;

// @CrossOrigin
@RestController
public class SessionController {
    @Autowired
    private UserRepository userRepository;
    // Create a session and store an attribute
    @PostMapping("/login")
    public ResponseEntity<String> createSession(HttpSession session, @RequestBody LoginForm loginForm) {
        // Set a session attribute (e.g., username)
        String username = loginForm.getName();
        String password = loginForm.getPassword();
        List<User> user= userRepository.findByUsername(username);
        if (user.size()!=0){
            User u = user.getFirst();
            if (u.getPassword().equals(password)){
                session.setAttribute("userId", u.getId());
                System.out.println("logging in");
                return new ResponseEntity<>("{}", HttpStatus.OK);
                
            }
            return new ResponseEntity<>("", HttpStatus.UNAUTHORIZED);    
        }
        //set userid
        // Retrieve and return the session ID
        return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
    }

    // Retrieve session attribute
    @GetMapping("/session")
    public ResponseEntity<String> getSession(HttpSession session) {
        // Get the session attribute (username)
        Long userId =  (Long) session.getAttribute("userId");

        // If no session exists, return an error message
        if (userId == null) {
            return new ResponseEntity<>("{\"session\": false}", HttpStatus.OK);

        }

        // Return session data to the client
            return new ResponseEntity<>("{\"session\": true, \"userId\": "+userId+"}", HttpStatus.OK);
    }

    // Invalidate the session
    @PostMapping("/logout")
    public String invalidateSession(HttpSession session) {
        // Invalidate the session
        session.invalidate();
        return "Logged out";
    }
}