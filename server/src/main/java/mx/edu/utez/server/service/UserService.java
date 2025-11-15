package mx.edu.utez.server.service;


import mx.edu.utez.server.model.User;
import mx.edu.utez.server.model.UserDto;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.Set;

@Service
public class UserService {

    private final IUser userRepository;

    private final Map<String, Object> response = new java.util.HashMap<>();

    public UserService(IUser userRepository) {
        this.userRepository = userRepository;
    }

    public Map<String, Object> findAll(){
        Set<User> users = Set.copyOf(userRepository.findAll());
        response.put("message", users.isEmpty() ?"Users found": "No users found");
        response.put("status", !users.isEmpty());
        response.put("data", users);
        return response;
    }

    public Map<String, Object> findById(Long id){
        User user = userRepository.findById(id).orElse(null);
        if (Objects.isNull(user)){
            response.put("message", "User not found");
            response.put("status", false);
            return response;
        }
        response.put("message", "User found");
        response.put("status", true);
        response.put("data", user);
        return response;
    }

    public Map<String, Object> save(UserDto dto){
        User user = userRepository.save(toUser(dto));
        response.put("message", "User created");
        response.put("status", true);
        response.put("data", user);
        return response;
    }

    public Map<String, Object> update(UserDto dto){
        if (Objects.isNull(userRepository.findById(dto.getId()).orElse(null))){
            response.put("message", "User not found");
            response.put("status", false);
            return response;
        }
        User user = userRepository.save(toUser(dto));
        response.put("message", "User updated");
        response.put("status", true);
        response.put("data", user);
        return response;
    }

    public Map<String, Object> delete(Long id){
        System.out.println("El ID es: " + id);
        User user = userRepository.findById(id).orElse(null);
        if (Objects.isNull(user)){
            System.out.println("Usuario no encontrado");
            response.put("message", "User not found");
            response.put("status", false);
            return response;
        }
        System.out.println("Usuario encontrado: " + user.getName());
        userRepository.deleteById(id);
        response.put("message", "User deleted");
        response.put("status", true);
        return response;
    }

    private User toUser(UserDto dto){
        return new User(
                dto.getId(),
                dto.getName(),
                dto.getEmail(),
                dto.getPhoneNumber()
        );
    }
}
