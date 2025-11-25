import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState, type ChangeEvent } from "react";
import { useSignUp } from "@/hooks/mutations/use-sign-up";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [checkPwNoti, setCheckPwNoti] = useState("incorrect password");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { mutate: signUp } = useSignUp();

  // 입력된 비밀번호 체크
  useEffect(() => {
    if (password !== checkPw) {
      setCheckPwNoti("incorrect password");
    } else {
      setCheckPwNoti("");
    }
  }, [checkPw]);

  // 전화번호 폼 정규식, 숫자만 가능하게
  const handlePressPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  // 회원가입 정규식
  const handleSignUpClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (email.trim() === "") return;
    if (password.trim() === "") return;
    if (password !== checkPw) {
      alert("please check the password");
      return;
    }

    signUp({
      email,
      password,
      name,
      phone,
    });
  };

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">
                    <span className="text-red-500">*</span>
                    Full Name
                  </FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">
                    <span className="text-red-500">*</span>
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </Field>
                <Field>
                  <Field className="grid grid-cols-1 gap-4">
                    <FieldDescription>
                      Must be at least 6 characters long.
                    </FieldDescription>
                    <Field>
                      <FieldLabel htmlFor="password">
                        <span className="text-red-500">*</span>
                        Password
                      </FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="at least 6 characters."
                        required
                      />
                      <FieldDescription className="text-red-500">
                        {checkPwNoti}
                      </FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-password">
                        <span className="text-red-500">*</span>
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={checkPw}
                        onChange={(e) => setCheckPw(e.target.value)}
                        required
                      />
                    </Field>
                  </Field>
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => handlePressPhone(e)}
                  />
                </Field>
                <Field>
                  <Button
                    type="submit"
                    onClick={handleSignUpClick}
                    className="cursor-pointer"
                  >
                    Create Account
                  </Button>
                  <FieldDescription className="text-center">
                    Already have an account? <a href="/login">Login</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  );
}
