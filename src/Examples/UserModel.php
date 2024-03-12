<?php
class UserModel {
  private $conn;

  public function __construct($conn) {
    $this->conn = $conn;
  }

  public function getAllUsers() {
    $query = "SELECT * FROM users";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();

    return $stmt;
  }

  public function getUserById($id) {
    $query = "SELECT * FROM users WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();

    return $stmt;
  }

  public function addUser($name, $email) {
    $query = "INSERT INTO users (name, email, created_at, updated_at) VALUES (:name, :email, NOW(), NOW())";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":email", $email);

    return $stmt->execute();
  }

  public function updateUser($id, $name, $email) {
    $query = "UPDATE users SET name = :name, email = :email, updated_at = NOW() WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":email", $email);

    return $stmt->execute();
  }

  public function deleteUser($id) {
    $query = "DELETE FROM users WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":id", $id);

    return $stmt->execute();
  }
}
?>