import { JSX, SVGProps } from "react"
import Image from "next/image";

export default function AboutUsComponent() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <Image
            src="/resources/placeholder.svg"
            width={800}
            height={600}
            alt="About Us"
            className="mx-auto rounded-xl object-cover object-center"
          />
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About InstantCash</h2>
              <p className="text-muted-foreground md:text-xl">
                At InstantCash, we are a team of passionate individuals dedicated to creating innovative solutions that
                empower our clients to achieve their goals. With a rich history spanning over a decade, we have built a
                reputation for delivering exceptional results and fostering long-lasting partnerships.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <RocketIcon className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Innovation</h3>
                  <p className="text-muted-foreground">
                    We constantly strive to push the boundaries of what&apos;s possible, embracing new technologies and ideas
                    to deliver cutting-edge solutions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HandshakeIcon className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Collaboration</h3>
                  <p className="text-muted-foreground">
                    We believe in the power of teamwork and collaboration, working closely with our clients to understand
                    their unique needs and deliver tailored solutions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <InfinityIcon className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Integrity</h3>
                  <p className="text-muted-foreground">
                    Honesty, transparency, and ethical conduct are the foundation of our business. We are committed to
                    building trust and delivering on our promises.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ScalingIcon className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Growth</h3>
                  <p className="text-muted-foreground">
                    We are constantly evolving and adapting to the changing landscape, ensuring that we remain at the
                    forefront of our industry and provide our clients with the best possible solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  function HandshakeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m11 17 2 2a1 1 0 1 0 3-3" />
        <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
        <path d="m21 3 1 11h-2" />
        <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
        <path d="M3 4h8" />
      </svg>
    )
  }
  
  
  function InfinityIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
      </svg>
    )
  }
  
  
  function RocketIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    )
  }
  
  
  function ScalingIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M14 15H9v-5" />
        <path d="M16 3h5v5" />
        <path d="M21 3 9 15" />
      </svg>
    )
  }