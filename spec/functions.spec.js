describe("Login and Sign-Up Validation Tests", () => {
  beforeAll(() => {
    jasmine.addMatchers({
      toBeValidEmail: () => {
        return {
          compare: (received) =>{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const pass = emailRegex.test(received);
            return {
              pass,
              message: pass
                ? `Expected ${received} not to be a valid email`
                : `Expected ${received} to be a valid email`,
            };
          },
        };
      },

      toBeValidUsername: () => {
        return {
          compare: (received) => {
            const usernameRegex = /^[A-Za-z]{3,}$/;
            const pass = usernameRegex.test(received);
            return {
              pass,
              message: pass
                ? `Expected ${received} not to be a valid username`
                : `Expected ${received} to be a valid username`,
            };
          },
        };
      },

      toBeValidPassword: () => {
        return {
          compare: (received) => {
            const passwordRegex =
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            const pass = passwordRegex.test(received);
            return {
              pass,
              message: pass
                ? `Expected ${received} not to be a valid password`
                : `Expected ${received} to be a valid password`,
            };
          },
        };
      },

      toReturnSuccess: () => {
        return {
          compare: function (received, expected) {
            const pass = Array.isArray(received)
              ? received.includes(expected)
              : received === expected;
            return {
              pass,
              message: pass
                ? `Expected response not to be "${expected}"`
                : `Expected response to be "${expected}", but got ${received}`,
            };
          },
        };
      },
    });
  });

  // Email validation tests
  describe("Email Validation", () => {
    it("should accept a correctly formatted email address", () => {
      expect(("test@example.com")).toBeValidEmail();
      expect(("user.name+tag@domain.co.uk")).toBeValidEmail();
    });

    it("should reject an email without domain", () => {
      expect(validateEmail("test@")).not.toBeValidEmail();
    });

    it("should reject an email without '@' symbol", () => {
      expect(validateEmail("testexample.com")).not.toBeValidEmail();
    });

    it("should reject an email without TLD (Top-Level Domain)", () => {
      expect(validateEmail("test@example")).not.toBeValidEmail();
    });

    it("should reject email with spaces", () => {
      expect(validateEmail("test@ example.com")).not.toBeValidEmail();
    });

    it("should reject email with multiple '@' symbols", () => {
      expect(validateEmail("test@@example.com")).not.toBeValidEmail();
    });
  });

  // Password validation tests
  describe("Password Validation", () => {
    it("should accept a valid password", () => {
      expect(validatePassword("Password1")).toBe(true);
      expect(validatePassword("MyPass123")).toBe(true);
    });

    it("should reject password without an uppercase letter", () => {
      expect(validatePassword("password1")).not.toBeValidPassword();
    });

    it("should reject password without a lowercase letter", () => {
      expect(validatePassword("PASSWORD1")).not.toBeValidPassword();
    });

    it("should reject password without a number", () => {
      expect(validatePassword("Password")).not.toBeValidPassword();
    });

    it("should reject password shorter than 8 characters", () => {
      expect(validatePassword("Pass1")).not.toBeValidPassword();
    });

    it("should reject password with spaces", () => {
      expect(validatePassword("Pass word1")).not.toBeValidPassword();
    });
  });

  // Username validation tests
  describe("Username Validation", () => {
    it("should accept a valid username", () => {
      expect(validateUsername("useruser")).toBeValidUsername();
      expect(validateUsername("USERNAME")).toBeValidUsername();
    });

    it("should reject username with special characters", () => {
      expect(("user_123")).not.toBeValidUsername();
      expect(("user@name")).not.toBeValidUsername();
    });

    it("should reject username shorter than 3 characters", () => {
      expect(("uz")).not.toBeValidUsername();
    });

    it("should reject username that contains numbers", () => {
      expect(("user123")).not.toBeValidUsername();
    });

    it("should reject username with spaces", () => {
      expect(("user name")).not.toBeValidUsername();
    });
  });

  // Login function tests
  describe("Login Function", () => {
    it("should return success for a valid email and password", () => {
      expect(loginUser("test@example.com", "Password1")).toReturnSuccess(
        "Login Successful"
      );
    });

    it("should return 'Invalid email format' for an invalid email", () => {
      expect(loginUser("invalid-email", "Password1")).toEqual([
        "Invalid email format",
      ]);
    });

    it("should return 'Password does not meet criteria' for an invalid password", () => {
      expect(loginUser("test@example.com", "pass")).toEqual([
        "Invalid password",
      ]);
    });

    it("should return both errors if both email and password are invalid", () => {
      expect(loginUser("invalid-email", "pass")).toEqual([
        "Invalid email format",
        "Invalid password",
      ]);
    });
  });

  // Sign-up function tests
  describe("Sign-Up Function", () => {
    it("should return success for valid inputs", () => {
      expect(
        signUpUser("test@example.com", "Password1", "user")
      ).toReturnSuccess("Sign-Up Successful");
    });

    it("should return 'Invalid email format' for an invalid email", () => {
      expect(signUpUser("invalid-email", "Password1", "user")).toEqual([
        "Invalid email format",
      ]);
    });

    it("should return 'Password does not meet criteria' for an invalid password", () => {
      expect(signUpUser("test@example.com", "pass", "user")).toEqual([
        "Password does not meet criteria",
      ]);
    });

    it("should return 'Username must be at least 3 characters and contain only letters' for invalid username", () => {
      expect(signUpUser("test@example.com", "Password1", "us")).toEqual([
        "Username must be at least 3 characters and contain only letters",
      ]);
      expect(signUpUser("test@example.com", "Password1", "user123")).toEqual([
        "Username must be at least 3 characters and contain only letters",
      ]);
    });

    it("should return multiple errors if email, password, and username are all invalid", () => {
      expect(signUpUser("invalid-email", "pass", "us")).toEqual([
        "Invalid email format",
        "Username must be at least 3 characters and contain only letters",
        "Password does not meet criteria",
      ]);
    });
  });
});
