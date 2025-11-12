package mx.edu.utez.server.service;

import mx.edu.utez.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUser extends JpaRepository<User, Long> {
}
