package mx.edu.utez.server.controller;

import mx.edu.utez.server.model.UserDto;
import mx.edu.utez.server.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"*"})
public class UserController {

    private UserService userService;

    @GetMapping("/")
    public Map<String, Object> getAllUsers() {
        return userService.findAll();
    }
    
    @GetMapping("/{id}")
    public Map<String, Object> getUserById(@RequestParam Long id) {
        return userService.findById(id);
    }

    @PostMapping("/")
    public Map<String, Object> createUser(@RequestBody UserDto dto) {
        return userService.save(dto);
    }

    @PutMapping("/")
    public Map<String, Object> updateUser(@RequestBody UserDto dto) {
        return userService.update(dto);
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteUser(@RequestParam Long id) {
        return userService.delete(id);
    }
}
