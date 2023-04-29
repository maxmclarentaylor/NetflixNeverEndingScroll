import { VideoSelectionComponent } from "../../src/components/videoSelectionPage/VideoSelectionComponent";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("Netflix scroll tests", () => {
  test("scroll moves forward correctly", async () => {
    global.innerWidth = 1500;
    global.dispatchEvent(new Event("resize"));
    render(<VideoSelectionComponent />);

    expect(
      screen.getByTestId("firstarrested development").getAttribute("role")
    ).toMatch("8");

    expect(
      screen.getByTestId("secondarrested development").getAttribute("role")
    ).toMatch("8");

    fireEvent.click(screen.getByTestId("first forward"));
    fireEvent.click(screen.getByTestId("second forward"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstarrested development").getAttribute("role")
        ).toMatch("2"),
      {
        timeout: 1800,
      }
    );
    expect(
      screen.getByTestId("secondarrested development").getAttribute("role")
    ).toMatch("2");
  });
  test("clicking backwards works correctly", async () => {
    global.innerWidth = 1500;
    global.dispatchEvent(new Event("resize"));
    render(<VideoSelectionComponent />);
    expect(
      screen.getByTestId("firstarrested development").getAttribute("role")
    ).toMatch("8");

    expect(
      screen.getByTestId("thirdarrested development").getAttribute("role")
    ).toMatch("8");

    fireEvent.click(screen.getByTestId("first forward"));
    fireEvent.click(screen.getByTestId("third forward"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstarrested development").getAttribute("role")
        ).toMatch("2"),
      {
        timeout: 2000,
      }
    );

    fireEvent.click(screen.getByTestId("first back"));
    fireEvent.click(screen.getByTestId("third back"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstarrested development").getAttribute("role")
        ).toMatch("8"),
      {
        timeout: 1800,
      }
    );
    fireEvent.click(screen.getByTestId("first back"));
    fireEvent.click(screen.getByTestId("third back"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstAfter Life").getAttribute("role")
        ).toMatch("8"),
      {
        timeout: 1800,
      }
    );
    await waitFor(() =>
      expect(
        screen.getByTestId("thirdAfter Life").getAttribute("role")
      ).toMatch("8")
    );
  });
  test(`different directions on diffrent carousels don't impact each other`, async () => {
    global.innerWidth = 1500;
    global.dispatchEvent(new Event("resize"));
    render(<VideoSelectionComponent />);
    fireEvent.click(screen.getByTestId("first forward"));
    fireEvent.click(screen.getByTestId("third forward"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("thirdarrested development").getAttribute("role")
        ).toMatch("2"),
      {
        timeout: 1800,
      }
    );
    await waitFor(() =>
      expect(
        screen.getByTestId("firstarrested development").getAttribute("role")
      ).toMatch("2")
    );
    fireEvent.click(screen.getByTestId("first back"));
    fireEvent.click(screen.getByTestId("third forward"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("thirdThe good place").getAttribute("role")
        ).toMatch("8"),
      {
        timeout: 2000,
      }
    );
    await waitFor(() =>
      expect(
        screen.getByTestId("firstarrested development").getAttribute("role")
      ).toMatch("8")
    );
  });
  test("throttle works", async () => {
    global.innerWidth = 1500;
    global.dispatchEvent(new Event("resize"));
    render(<VideoSelectionComponent />);
    fireEvent.click(screen.getByTestId("first forward"));
    fireEvent.click(screen.getByTestId("first forward"));
    fireEvent.click(screen.getByTestId("first forward"));
    fireEvent.click(screen.getByTestId("first forward"));
    fireEvent.click(screen.getByTestId("first forward"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstarrested development").getAttribute("role")
        ).toMatch("2"),
      {
        timeout: 1800,
      }
    );
  });
  test("user can click forward full circle", async () => {
    global.innerWidth = 1500;
    global.dispatchEvent(new Event("resize"));
    render(<VideoSelectionComponent />);
    expect(
      screen.getByTestId("firstarrested development").getAttribute("role")
    ).toMatch("8");
    fireEvent.click(screen.getByTestId("first forward"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstBrookyln 99").getAttribute("role")
        ).toMatch("8"),
      {
        timeout: 1800,
      }
    );
    fireEvent.click(screen.getByTestId("first forward"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstThe good place").getAttribute("role")
        ).toMatch("8"),
      {
        timeout: 1800,
      }
    );
    fireEvent.click(screen.getByTestId("first forward"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstDisenchantment").getAttribute("role")
        ).toMatch("8"),
      {
        timeout: 1800,
      }
    );
    fireEvent.click(screen.getByTestId("first forward"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstAfter Life").getAttribute("role")
        ).toMatch("8"),
      {
        timeout: 1800,
      }
    );
    fireEvent.click(screen.getByTestId("first forward"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstarrested development").getAttribute("role")
        ).toMatch("8"),
      {
        timeout: 1800,
      }
    );
  }, 8000);
  test("resizing the page gives the correct array structure", async () => {
    global.innerWidth = 1500;
    global.dispatchEvent(new Event("resize"));
    render(<VideoSelectionComponent />);
    expect(
      screen.getByTestId("firstarrested development").getAttribute("role")
    ).toMatch("8");
    global.innerWidth = 1330;
    global.dispatchEvent(new Event("resize"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstarrested development").getAttribute("role")
        ).toMatch("7"),
      {
        timeout: 1800,
      }
    );
    global.innerWidth = 1010;
    global.dispatchEvent(new Event("resize"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstarrested development").getAttribute("role")
        ).toMatch("6"),
      {
        timeout: 1800,
      }
    );
    global.innerWidth = 740;
    global.dispatchEvent(new Event("resize"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstarrested development").getAttribute("role")
        ).toMatch("5"),
      {
        timeout: 1800,
      }
    );
    global.innerWidth = 400;
    global.dispatchEvent(new Event("resize"));
    await waitFor(
      () =>
        expect(
          screen.getByTestId("firstarrested development").getAttribute("role")
        ).toMatch("4"),
      {
        timeout: 1800,
      }
    );
  });
});
